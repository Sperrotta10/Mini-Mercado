import { createRateLimiter } from "../rateLimiterFactory";

// Rate limiter for getting all roles
export const getLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: 'Demasiadas solicitudes para obtener roles. Intente más tarde.',
});

// Rate limiter for creating a new role
export const modifyLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'Límite de creación de roles alcanzado. Intente más tarde.',
});
