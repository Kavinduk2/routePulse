#  routepulse

> Zero-config Express.js middleware to automatically monitor, log, and analyze slow API routes in real-time.

Stop guessing which route is bottlenecking your app. `routepulse` acts as a high-precision stopwatch for your Express API, alerting you instantly in the terminal when a database query or endpoint takes too long.

Perfect for local development debugging and lightweight production monitoring.

---

##  Installation

```bash
npm install routepulse
```

(Also supports `yarn add routepulse` and `pnpm add routepulse`)

##  Quick Start

Drop it into your Express app right after your body parsers, but before your routes.

### ES Modules (import)

```javascript
import express from "express";
import analyzer from "routepulse";

const app = express();
app.use(express.json());

// 1. Initialize the monitor (Warns if a route takes > 500ms)
app.use(analyzer.monitor({ slowThreshold: 500 }));

// 2. Your routes
app.get("/api/users", (req, res) => {
  res.json({ message: "This route is lightning fast!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### CommonJS (require)

```javascript
const express = require("express");
const analyzer = require("routepulse");

const app = express();
app.use(express.json());
app.use(analyzer.monitor({ slowThreshold: 500 }));
```

##  Features

- **Zero-Config Setup**: No complex cloud dashboards, account sign-ups, or heavy agents to install.
- **The "Slow-Log" Alert**: Instantly prints a bright red warning in your terminal if a route crosses your millisecond threshold.
- **Smart Route Grouping**: Automatically merges dynamic routes (e.g., `/api/users/123`, `/api/products/uuid`, or `/api/orders/mongoId` all safely become `/api/.../:id`) to prevent memory leaks in production.
- **High-Precision Timing**: Uses Node's native `process.hrtime()` for nanosecond-level accuracy, immune to system clock drift.
- **TypeScript Ready**: Ships with built-in type declarations out of the box. No need to install `@types/routepulse`.

##  What happens when a route is slow?

If an endpoint exceeds your `slowThreshold`, routepulse catches it and prints a highly visible warning directly in your server console, including the exact query parameters that caused the slowdown:

```
🚨 SLOW ROUTE DETECTED
-> Route: POST /api/progress/mood
-> Time:  393.16ms (Threshold: 300ms)
-> Query: {"sort":"desc"}
-> Stats: Avg: 393.16ms | Max: 393.16ms
```

##  The Speed Dashboard

routepulse silently tracks your Max, Min, and Average response times in the background without polluting your console on fast routes.

At any point, navigate to the secret debug endpoint to view the live stats of your entire API:

 `http://localhost:3000/debug/speed`

```json
{
  "GET /api/users": {
    "hits": 42,
    "totalTimeMs": 1450.2,
    "avgTimeMs": 34.52,
    "maxTimeMs": 89.1,
    "minTimeMs": 12.4
  },
  "GET /api/users/:id": {
    "hits": 15,
    "totalTimeMs": 450.5,
    "avgTimeMs": 30.03,
    "maxTimeMs": 45.2,
    "minTimeMs": 28.1
  }
}
```

##  Configuration Options

Pass an options object into `analyzer.monitor(options)`:

| Option          | Type   | Default | Description                                                        |
| --------------- | ------ | ------- | ------------------------------------------------------------------ |
| `slowThreshold` | number | 500     | The time in milliseconds before the terminal warning is triggered. |

##  License

MIT © 2026
