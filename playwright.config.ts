import { defineConfig } from '@playwright/test';
import { baseUrl } from './src/utils/constants';
import 'dotenv/config';

export default defineConfig({
	testDir: 'src/tests',
	reporter: [["html"], ['allure-playwright']],
	fullyParallel: true,
	workers: 3,
	timeout: 60000,
	use: {
		trace: "on",
		baseURL: baseUrl,
		viewport: { width: 1280, height: 720 }
	},
});