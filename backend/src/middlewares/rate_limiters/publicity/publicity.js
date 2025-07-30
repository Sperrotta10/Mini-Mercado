import { createRateLimiter } from "../rateLimiterFactory.js";

// Rate limiter for getting all publicity
export const getLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 100
});

// Rate limiter for creating, updating, and deleting publicity
export const modifyLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 20
});
