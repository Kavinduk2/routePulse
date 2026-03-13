// src/utils.js

/**
 * Calculates the exact duration in milliseconds using Node's high-resolution timer.
 * @param {Array} startHrTime - The result of process.hrtime() captured at the start of the request
 * @returns {Number} Duration in milliseconds, rounded to 2 decimal places
 */
function getDurationInMs(startHrTime) {
  const diff = process.hrtime(startHrTime);
  // diff[0] is seconds, diff[1] is nanoseconds
  const timeInMs = (diff[0] * 1000) + (diff[1] / 1e6);
  return Number(timeInMs.toFixed(2));
}

/**
 * Normalizes dynamic routes to prevent memory leaks in production.
 * Groups different IDs into a single route identifier.
 * * Examples:
 * /api/users/123 -> /api/users/:id
 * /api/products/f47ac10b-58cc-4372-a567-0e02b2c3d479 -> /api/products/:id
 * /api/orders/507f1f77bcf86cd799439011 -> /api/orders/:id
 * * @param {String} path - The original request path
 * @returns {String} The sanitized path
 */
function normalizeRoute(path) {
  return path
    // 1. Catch standard UUIDs (e.g., f47ac10b-58cc-4372-a567-0e02b2c3d479)
    .replace(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, ':id')
    
    // 2. Catch MongoDB ObjectIds (24-character hex strings)
    .replace(/\b[0-9a-fA-F]{24}\b/g, ':id')
    
    // 3. Catch standard numeric IDs (e.g., /api/users/123)
    .replace(/\/[0-9]+/g, '/:id');
}

module.exports = {
  getDurationInMs,
  normalizeRoute
};