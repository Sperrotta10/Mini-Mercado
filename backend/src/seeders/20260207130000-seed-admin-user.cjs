'use strict';

function getSeedValue(key, fallback) {
  const value = process.env[key];
  return (value === undefined || value === null || String(value).trim() === '') ? fallback : value;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [{ enviroment }, { ModelUserRegister }] = await Promise.all([
      import('../config/enviroment.js'),
      import('../modules/user/register/model/register.js')
    ]);

    const email = getSeedValue('SEED_ADMIN_EMAIL', 'admin@minimercado.local');
    const username = getSeedValue('SEED_ADMIN_USERNAME', 'admin');
    const password = getSeedValue('SEED_ADMIN_PASSWORD', 'Admin123!');

    // Mantener el mismo “tipo” que enviroment.ROLE_DEFAULT (string) para no romper la lógica de ModelUserRegister.
    const role_id = String(getSeedValue('SEED_ADMIN_ROLE_ID', enviroment.ROLE_DEFAULT ?? '3'));

    // Verificar que exista el rol (evita errores FK poco claros)
    const [roleRows] = await queryInterface.sequelize.query(
      'SELECT rol_id FROM roles WHERE rol_id = ? LIMIT 1;',
      { replacements: [role_id] }
    );
    if (!roleRows?.length) {
      throw new Error(
        `No existe el rol con rol_id=${role_id}. Ejecuta primero el seeder de roles (db:seed:all) o ajusta SEED_ADMIN_ROLE_ID.`
      );
    }

    const result = await ModelUserRegister.create({ username, email, password }, role_id);

    if (result?.status === 201 || result?.status === 200) {
      console.log(result.message);
      return;
    }

    if (result?.status === 409) {
      console.log(`Admin ya existe (${email}); no se insertó nada.`);
      return;
    }

    // Caso borde: si el usuario existe, está inactivo y NO entra por el flujo de “cliente”, el modelo retorna 403.
    // Para que el seeder sea idempotente y útil, reactivamos y re-hasheamos el password.
    if (result?.status === 403 && String(result?.message || '').toLowerCase().includes('inactivo')) {
      const [{ User }, bcrypt] = await Promise.all([
        import('../models/index.js'),
        Promise.resolve(require('bcrypt'))
      ]);

      const salt = parseInt(enviroment.SALT, 10);
      if (!Number.isFinite(salt)) {
        throw new Error('SALT inválido o no definido en .env (necesario para hashear password).');
      }

      const hashPassword = await bcrypt.hash(password, salt);
      const [updated] = await User.update(
        { status: true, password: hashPassword, rol_id: role_id },
        { where: { email } }
      );

      if (!updated) {
        throw new Error(`No se pudo reactivar el admin existente (${email}).`);
      }

      console.log(`Admin reactivado (${email}).`);
      return;
    }

    throw new Error(`Seeder admin falló: ${result?.message || 'respuesta inesperada'}`);
  },

  async down(queryInterface, Sequelize) {
    const email = getSeedValue('SEED_ADMIN_EMAIL', 'admin@minimercado.local');
    await queryInterface.bulkDelete('users', { email }, {});
  }
};
