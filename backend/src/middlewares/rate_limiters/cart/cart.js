import { createRateLimiter } from "../rateLimiterFactory";

// Rate limiter for cart operations
export const createLimiter = createRateLimiter({
    windowMs: 10 * 60 * 1000, 
    max: 5
});

// Rate limiter for getting all carts
export const readLimiter   = createRateLimiter({
    windowMs: 10 * 60 * 1000, 
    max: 30
});

// Rate limiter for updating a specific cart by ID
export const updateLimiter = createRateLimiter({
    windowMs: 10 * 60 * 1000, 
    max: 15
});

// Rate limiter for deleting a cart
export const deleteLimiter = createRateLimiter({
    windowMs: 10 * 60 * 1000, 
    max: 10
});