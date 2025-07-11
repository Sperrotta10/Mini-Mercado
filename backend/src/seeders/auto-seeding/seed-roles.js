import { Role } from '../../models/index.js';

export async function seedRoles() {
  const roles = ['cliente', 'empleado', 'admin'];
  for (const name of roles) {
    await Role.findOrCreate({ where: { name } });
  }
}
