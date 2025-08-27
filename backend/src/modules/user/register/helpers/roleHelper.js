import { Role } from '../../../../models/index.js';
import { roleValidation } from '../validation/resolve_role.js';

export async function resolveRole(role) {

  const result = roleValidation(role);
  
  if(!result.success) return { message: "Rol no válido", status: 400, success: false };

  const roleRecord = await Role.findOne({ where: { name: role } });

  if (!roleRecord) return {message : "Rol no encontrado", status : 404, success : false};

  return { message : "Rol encontrado", rol_id : roleRecord.rol_id, success : true };
}
