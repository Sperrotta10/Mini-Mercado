import { enviroment } from "../../config/enviroment.js";
import jwt from 'jsonwebtoken';

export function authenticateHybrid(req, res, next) {
    
  // Verificar JWT
  const token = req.signedCookies.access_token;
  if (token) {
    try {
      const user = jwt.verify(token, enviroment.JWT_SECRET);
      req.user = user;
      return next();
    } catch {
      return res.status(401).json({ message: "Token inválido" });
    }
  }

  // Verificar sesión de Passport
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // No autenticado por ninguno
  return res.status(401).json({ message: "No autenticado" });
}
