// src/index.js
const { getDurationInMs, normalizeRoute } = require('./utils');

// In-memory storage for our route statistics
const routeStats = {};

/**
 * Initializes the API timer middleware.
 * @param {Object} options - Configuration options
 * @param {Number} options.slowThreshold - Time in ms before a warning is thrown (default: 500)
 */
function monitor(options = {}) {
  // Allow developers to set their own threshold, default to 500ms
  const slowThreshold = options.slowThreshold || 500;

  return (req, res, next) => {
    // 1. The Dashboard Endpoint: A secret route to view the stats table
    if (req.path === '/debug/speed') {
      console.table(routeStats);
      return res.status(200).json(routeStats);
    }

    // 2. Start the high-resolution timer before the route executes
    const startHrTime = process.hrtime();
    
    // 3. Normalize the route to group dynamic IDs (e.g., /api/users/:id)
    const routePath = normalizeRoute(req.path);
    const routeKey = `${req.method} ${routePath}`;

    // 4. Listen for the exact moment the server finishes sending the response
    res.on('finish', () => {
      const duration = getDurationInMs(startHrTime);

      // Initialize this route in our tracker if it's the first time it's hit
      if (!routeStats[routeKey]) {
        routeStats[routeKey] = {
          hits: 0,
          totalTimeMs: 0,
          avgTimeMs: 0,
          maxTimeMs: duration,
          minTimeMs: duration
        };
      }

      // Update the statistics
      const stats = routeStats[routeKey];
      stats.hits += 1;
      stats.totalTimeMs += duration;
      stats.avgTimeMs = Number((stats.totalTimeMs / stats.hits).toFixed(2));
      
      if (duration > stats.maxTimeMs) stats.maxTimeMs = duration;
      if (duration < stats.minTimeMs) stats.minTimeMs = duration;

      // 5. The "Slow-Log" Alert: Fire a massive warning if the threshold is crossed
      if (duration > slowThreshold) {
        console.log(`\n\x1b[41m\x1b[37m 🚨 SLOW ROUTE DETECTED \x1b[0m`);
        console.log(`\x1b[31m -> Route: ${routeKey}`);
        console.log(` -> Time:  ${duration}ms (Threshold: ${slowThreshold}ms)`);
        // Log query params in case a specific search caused the slow down
        console.log(` -> Query: ${JSON.stringify(req.query)}`);
        console.log(` -> Stats: Avg: ${stats.avgTimeMs}ms | Max: ${stats.maxTimeMs}ms\x1b[0m\n`);
      }
    });

    // Pass control back to the developer's actual application code
    next();
  };
}

// Export it as an object so developers can call `analyzer.monitor()`
module.exports = { monitor };