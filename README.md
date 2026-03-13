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
