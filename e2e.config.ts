import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  workers: 8,
  timeout: 360000,
  retries: 0,
  testDir: 'tests/e2e',
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    storageState: 'auth.json',
    video: {
      mode: 'retain-on-failure',
      size: { width: 1920, height: 1080 },
    },
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
      },
    ],
  ],
};

console.log(`Running tests with ${config.workers} workers`);

export default config;
