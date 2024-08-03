import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  workers: 8,
  timeout: 60000,
  retries: 0,
  testDir: 'tests/visual',
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 },
    },
    screenshot: 'off',
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
