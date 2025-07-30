import { createRateLimiter } from "../rateLimiterFactory";

// Las rutas GET son más expuestas, pero se les permite más tráfico.
export const getListLimiter = createRateLimiter({ 
    windowMs: 5 * 60 * 1000, 
    max: 100 
});

// Las rutas que modifican (POST, PATCH, DELETE) requieren autenticación/autorización y un rate limit más bajo.
export const modifyLimiter = createRateLimiter({ 
    windowMs: 10 * 60 * 1000, 
    max: 20 
});