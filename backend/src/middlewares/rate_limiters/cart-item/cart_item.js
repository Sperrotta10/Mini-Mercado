import { createRateLimiter } from "../rateLimiterFactory";

// Rate limiter for getting cart items
export const readLimiter = createRateLimiter({ 
    windowMs: 10 * 60 * 1000,
    max: 50
});

// Rate limiter for modifying cart items
export const writeLimiter = createRateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 20
});