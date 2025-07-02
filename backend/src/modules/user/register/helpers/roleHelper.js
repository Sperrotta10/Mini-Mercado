import { Role } from '../../../../models/index.js';

export async function resolveRole(role) {
  if (!role) throw new Error("Role es requerido");

  if (typeof role === 'string' && role === 'empleado') {
    // Asumo que viene el nombre: busco su id
    const roleRecord = await Role.findOne({ where: { name: role } });
    if (!roleRecord) return {message : "Rol no encontrado", status : 404, success : false};
    return { message : "Rol encontrado", rol_id : roleRecord.rol_id, success : true };

  } else {
    return { message : "Tipo de rol no válido", status : 400, success : false };
  }
}
