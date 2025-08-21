# Agent Guidelines for vscode-lit-html

## Runtime & Package Management
- **Runtime**: This project uses **Bun** as the primary JavaScript runtime
- **Package Manager**: All dependencies are managed with Bun (`bun install`, `bun add`, etc.)
- **Lockfile**: Uses `bun.lock` for dependency resolution
- **GitHub Actions**: CI/CD workflows use Bun via `oven-sh/setup-bun@v2`

## Build/Test Commands
- **Build**: `bun run compile` or `tsc -p ./` (outputs to `./out`)
- **Test**: `bun test` or `bun run test` (runs all colorization tests using modern @vscode/test-cli)
- **Watch**: `bun run watch` (TypeScript watch mode)
- **Single test**: No specific command - tests run fixture files in `test/colorize-fixtures/`
- **Install dependencies**: `bun install`
- **Add dependency**: `bun add <package>`
- **Add dev dependency**: `bun add -D <package>`

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