/**
 * Branch Static Data Entry Point
 * Each branch now has its own dedicated data file inside `data/branches/`:
 * - `data/branches/bally.ts`
 * - `data/branches/mahestala.ts`
 * - `data/branches/howrah.ts`
 * - `data/branches/newtown.ts`
 *
 * This file re-exports the centralized branch registry and utilities for backward compatibility.
 */

export * from "./branches";
