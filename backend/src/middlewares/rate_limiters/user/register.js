import { createRateLimiter } from "../rateLimiterFactory.js";

// Registro público
export const publicRegisterLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 3,
  message: 'Demasiadas solicitudes de registro. Intenta más tarde.',
});

// GET general (admin)
export const adminGetLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: 'Demasiadas consultas. Espera un momento.',
});

// GET por cédula
export const cedulaLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: 'Demasiadas búsquedas por cédula. Intenta más tarde.',
});

// Paginación empleados
export const paginationLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes de paginación.',
});

// GET por ID
export const getIdLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: 'Demasiadas solicitudes por ID.',
});

// PATCH - actualización
export const updateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'Demasiadas actualizaciones en poco tiempo.',
});

// DELETE - eliminación
export const deleteLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: 'Demasiadas eliminaciones seguidas.',
});
