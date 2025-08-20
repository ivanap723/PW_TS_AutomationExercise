import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	reporter: "html",
	fullyParallel: true,
	workers: 3,
	timeout: 60000,
	use: {
		trace: "on",
		baseURL: 'https://www.automationexercise.com/',
		viewport: { width: 1280, height: 720 }
	},

});