// src/index.d.ts
import { RequestHandler } from 'express';

export interface AnalyzerOptions {
  /** * The time in milliseconds before a warning is thrown in the console.
   * @default 500
   */
  slowThreshold?: number;
}

/**
 * Initializes the API timer middleware to monitor slow routes.
 */
export function monitor(options?: AnalyzerOptions): RequestHandler;