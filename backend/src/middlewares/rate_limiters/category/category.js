import { createRateLimiter } from '../rateLimiterFactory.js';

// Rate limiter for category operations
export const getLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 100
});

// Rate limiter for modifying a category
export const modifyLimiter = createRateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 20
});