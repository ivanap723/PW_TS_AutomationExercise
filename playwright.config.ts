import { defineConfig } from '@playwright/test';
import { baseUrl } from './src/utils/constants';

export default defineConfig({
	testDir: 'src/tests',
	reporter: "html",
	fullyParallel: true,
	workers: 3,
	timeout: 60000,
	use: {
		trace: "on",
		baseURL: baseUrl,
		viewport: { width: 2560, height: 1440 }
	},
});