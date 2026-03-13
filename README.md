# routePulse

Zero-config Express.js middleware to automatically monitor, log, and analyze slow API routes.

## Overview

routePulse is a lightweight, high-performance middleware for Express.js applications that helps you identify and track slow API endpoints in real-time. It uses Node.js high-resolution timers to measure request duration with microsecond precision.

## Features

- ⚡ **Zero-Config Setup** - Works out of the box with sensible defaults
- 📊 **Automatic Analytics** - Collects hit counts, average response time, min/max times
- 🔍 **Dynamic Route Normalization** - Groups endpoints by pattern (e.g., `/api/users/:id`)
- 🚨 **Slow Route Alerts** - Configurable threshold for warning about slow responses
- 📈 **Debug Dashboard** - Built-in endpoint to view real-time statistics
- 🎯 **Production Ready** - Handles UUID, MongoDB ObjectID, and numeric IDs

## Installation

```bash
npm install routePulse
```

## Quick Start

```javascript
const express = require("express");
const { monitor } = require("routePulse");

const app = express();

// Add the middleware
app.use(monitor({ slowThreshold: 500 }));

// Your routes here
app.get("/api/users", (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);
```

## Configuration

### Options

```javascript
{
  slowThreshold: 500; // Time in milliseconds before a warning is logged (default: 500ms)
}
```

## Debug Dashboard

View real-time statistics by visiting the debug endpoint:

```
GET /debug/speed
```

Response:

```json
{
  "GET /api/users": {
    "hits": 42,
    "totalTimeMs": 1250,
    "avgTimeMs": 29.76,
    "maxTimeMs": 125,
    "minTimeMs": 8
  }
}
```

## License

MIT
