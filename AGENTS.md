# Agent Guidelines for vscode-lit-html

## Build/Test Commands
- **Build**: `npm run compile` or `tsc -p ./` (outputs to `./out`)
- **Test**: `npm test` (runs all colorization tests)
- **Watch**: `npm run watch` (TypeScript watch mode)
- **Single test**: No specific command - tests run fixture files in `test/colorize-fixtures/`

## Code Style
- **Language**: TypeScript with strict mode enabled
- **Target**: ES2020, CommonJS modules
- **Imports**: Use `import * as name` for namespaces, explicit imports for specific items
- **Formatting**: 4-space indentation, semicolons required
- **Types**: Explicit interfaces for complex objects, use readonly arrays for config
- **Naming**: camelCase variables/functions, PascalCase interfaces, lowercase constants
- **Error handling**: Early returns, explicit undefined checks
- **VSCode patterns**: Use `vscode.workspace.getConfiguration()`, subscribe to events properly

## Project Structure
- Source: `src/` (TypeScript) → compiled to `out/`
- Tests: `test/` directory with Mocha test files
- This is a VSCode extension that provides lit-html syntax highlighting