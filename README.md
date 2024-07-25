# Настройка и запуск тестов с использованием Playwright

## Установка

1. Установите Playwright Test:

   ```bash
   npm install @playwright/test
   ```

2. Установите необходимые браузеры для Playwright:
   ```bash
   npx playwright install
   ```

## Запуск тестов

3. Запуск всех тестов по умолчанию:

   ```bash
   npx playwright test
   ```

4. Запуск тестов с указанной конфигурацией и проектом:

   ```bash
   npx playwright test --config=playwright.config.ts --project=Chromium
   ```

5. Запуск тестов с репортером:

   ```bash
   npx playwright test --reporter=html
   ```

   Также доступны другие параметры для репортера: `dot`, `list`, `junit`, `line`.

6. Запуск тестов в видимом браузере (headed mode):

   ```bash
   npx playwright test --headed
   ```

7. Запуск тестов с указанным тегом:

   ```bash
   npx playwright test --grep @myTag
   ```

   Или наоборот, не запускать тесты с указанным тегом:

   ```bash
   npx playwright test --grep-invert @myTag
   ```

8. Запуск каждого теста на всех браузерах:
   ```bash
   npx playwright test --browser=all
   ```
   Или указать конкретный браузер.

## Пример конфигурационного файла

```typescript
import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 1,
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: 'retry-with-video',
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
}

export default config
```
