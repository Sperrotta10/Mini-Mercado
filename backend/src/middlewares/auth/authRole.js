export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    // Asumimos que req.user tiene un campo "role" o "rol_id"
    const userRole = req.user?.rol || req.user?.rol_id;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "No autorizado" });
    }

    next();
  };
}
