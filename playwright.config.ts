import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: "html",
  use: {
    trace: "on"
  },
});