> [!NOTE]
> This is a fork of the original [vscode-lit-html](https://github.com/mjbvz/vscode-lit-html) extension, created for the sole purpose of re-publishing to the [Open VSX Registry](https://open-vsx.org/). The original project is MIT licensed.

This extension provides syntax highlighting and language support for HTML within JavaScript and TypeScript tagged template strings, commonly used in frameworks like [lit-html](https://github.com/PolymerLabs/lit-html).

![](https://github.com/mjbvz/vscode-lit-html/raw/master/docs/example.gif)

## Features

- Syntax highlighting for inline HTML blocks.
- IntelliSense for HTML tags and attributes.
- Quick info hovers on HTML tags.
- Formatting support for HTML tags.
- Auto-closing HTML tags.
- Folding for HTML blocks.
- Syntax highlighting for inline CSS blocks tagged with `css`.
- IntelliSense for CSS properties and values within `css` tagged templates.
- Supports literal HTML and CSS strings containing placeholders.

## Usage

This extension enhances JavaScript and TypeScript with highlighting and IntelliSense for lit-html template strings. It functions automatically with VS Code's built-in TypeScript version.

For VS Code 1.30 or older, if you're [using a workspace version of TypeScript](https://code.visualstudio.com/Docs/languages/typescript#_using-newer-typescript-versions), manual configuration of the TS Server plugin is required. Follow [these instructions](https://github.com/Microsoft/typescript-lit-html-plugin#usage).

## Configuration

Configure this plugin via a `tsconfig` or `jsconfig` file as detailed [here](https://github.com/Microsoft/typescript-lit-html-plugin#configuration), or directly within VS Code (requires VS Code 1.30+ and TypeScript 3.2+). Note: VS Code settings override `tsconfig` or `jsconfig` configurations.

### Tags

By default, this extension provides HTML IntelliSense for template literals [tagged](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) with `html` or `raw`:

```js
import { html } from "lit-html";

const a = html` <div></div> `;
```

You can enable IntelliSense for other tag names by setting `"lit-html.tags"`:

```json
"lit-html.tags": [
    "html",
    "template"
]
```

### CSS Tags

Similarly, this extension provides CSS IntelliSense for template literals tagged with `css` by default:

```js
import { css } from "lit-element"; // Or your preferred CSS tagging library

const styles = css`
  .my-element {
    color: blue;
  }
`;
```

You can enable CSS IntelliSense for other tag names by setting `"lit-html.cssTags"`:

```json
"lit-html.cssTags": [
    "css",
    "style"
]
```

### Formatting

The plugin formats html code by default. You can disable this by setting `"lit-html.format.enabled": false`:

```json
"lit-html.format.enabled": false
```
