import rateLimit from 'express-rate-limit';

/**
 * Crea un middleware de rate limiting con valores personalizables.
 * @param {Object} options
 * @param {number} options.windowMs - Tiempo de ventana (en ms)
 * @param {number} options.max - Número máximo de solicitudes por ventana
 * @param {string} [options.message] - Mensaje en caso de exceder el límite
 * @param {boolean} [options.standardHeaders=true] - Usar headers estándar de rate-limit
 * @param {boolean} [options.legacyHeaders=false] - Desactivar headers antiguos (X-RateLimit-*)
 */
export function createRateLimiter({
  windowMs,
  max,
  message = 'Demasiadas solicitudes. Intente más tarde.',
  standardHeaders = true,
  legacyHeaders = false
}) {
  return rateLimit({
    windowMs,
    max,
    message,
    standardHeaders,
    legacyHeaders,
  });
}
