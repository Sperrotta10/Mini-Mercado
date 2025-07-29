import { Role } from '../../models/index.js';

export async function seedRoles() {

  try {
    const roles = ['cliente', 'empleado', 'admin'];
    for (const name of roles) {
      await Role.findOrCreate({ where: { name } });
    }

    console.log("✅ Roles seed cargados correctamente.");
  } catch (error) {
    console.error("Error seeding roles:", error);
    throw error;
    
  }
}
