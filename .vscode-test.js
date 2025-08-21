import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  files: 'test/**/*.test.js',
  version: 'stable',
  workspaceFolder: './',
  mocha: {
    ui: 'tdd',
    timeout: 10000,
    color: true
  }
});