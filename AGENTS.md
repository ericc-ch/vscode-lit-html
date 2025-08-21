# Agent Guidelines for vscode-lit-html

## Runtime & Package Management
- **Runtime**: This project uses **Bun** as the primary JavaScript runtime
- **Package Manager**: All dependencies are managed with Bun (`bun install`, `bun add`, etc.)
- **Lockfile**: Uses `bun.lock` for dependency resolution
- **GitHub Actions**: CI/CD workflows use Bun via `oven-sh/setup-bun@v2`

## Build/Test Commands
- **Build**: `bun run compile` (uses Rollup to compile TypeScript to `./out`)
- **Test**: `bun test` (runs colorization tests using @vscode/test-cli with Mocha)
- **Watch**: `bun run watch` (Rollup watch mode for development)
- **Lint**: `bun run lint` (uses ESLint with @echristian/eslint-config)
- **Single test**: Run specific fixture via `bun test --grep "fixture-name"`
- **Install dependencies**: `bun install`
- **Add dependency**: `bun add <package>`
- **Add dev dependency**: `bun add -D <package>`

## Code Style
- **Language**: TypeScript with strict mode enabled
- **Target**: ESNext modules with bundler resolution
- **Imports**: ES6 imports, namespace imports for VSCode APIs
- **Formatting**: Follows @echristian/eslint-config rules
- **Types**: Strict TypeScript with noUnusedLocals, noUnusedParameters, verbatimModuleSyntax
- **Naming**: camelCase variables/functions, PascalCase interfaces, UPPER_CASE constants
- **Error handling**: Early returns, explicit undefined/null checks
- **VSCode patterns**: Use vscode.workspace.getConfiguration(), proper event subscriptions

## Project Structure
- Source: `src/` (TypeScript) → compiled to `out/` via Rollup
- Tests: `test/` with Mocha TDD UI, fixtures in `test/colorize-fixtures/`
- Syntax: TextMate grammars in `syntaxes/` for lit-html highlighting
- This is a VSCode extension that provides lit-html syntax highlighting and IntelliSense