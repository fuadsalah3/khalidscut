/// <reference types="vite/client" />

declare module '../vite-api-dev.js' {
  import type { Plugin } from 'vite'
  export function apiDevPlugin(): Plugin
}
