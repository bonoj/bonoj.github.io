const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: __dirname, testMatch: '**/*.spec.cjs',
  timeout: 30000, retries: 0, reporter: 'list',
  use: { browserName: 'chromium', headless: true, viewport: {width:390,height:844} },
  webServer: {command: 'node server.cjs', cwd: __dirname, url:'http://localhost:4179/game-test', reuseExistingServer: !process.env.CI, timeout:15000}
});
