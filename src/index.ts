import * as vscode from 'vscode';

const typeScriptExtensionId = 'vscode.typescript-language-features';
const pluginId = 'typescript-lit-html-plugin';
const styledPluginId = '@styled/typescript-styled-plugin';
const configurationSection = 'lit-html';

interface SynchronizedConfiguration {
    tags?: ReadonlyArray<string>;
    cssTags?: ReadonlyArray<string>;
    format: {
        enabled?: boolean;
    }
}

export async function activate(context: vscode.ExtensionContext) {
    const extension = vscode.extensions.getExtension(typeScriptExtensionId);
    if (!extension) {
        return;
    }

    await extension.activate();
    if (!extension.exports || !extension.exports.getAPI) {
        return;
    }
    const api = extension.exports.getAPI(0);
    if (!api) {
        return;
    }

    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration(configurationSection)) {
            synchronizeConfiguration(api);
        }
    }, undefined, context.subscriptions);

    synchronizeConfiguration(api);
}

function synchronizeConfiguration(api: any) {
    const config = getConfiguration();
    api.configurePlugin(pluginId, {
        tags: config.tags,
        format: config.format,
    });
    api.configurePlugin(styledPluginId, {
        tags: config.cssTags,
        // We don't currently configure linting/validation for the styled plugin,
        // but could add properties here if needed in the future.
    });
}

function getConfiguration(): SynchronizedConfiguration {
    const config = vscode.workspace.getConfiguration(configurationSection);
    const outConfig: SynchronizedConfiguration = {
        format: {}
    };

    withConfigValue<string[]>(config, 'tags', tags => { outConfig.tags = tags; });
    withConfigValue<string[]>(config, 'cssTags', cssTags => { outConfig.cssTags = cssTags; });
    withConfigValue<boolean>(config, 'format.enabled', enabled => { outConfig.format.enabled = enabled; });

    return outConfig;
}

function withConfigValue<T>(config: vscode.WorkspaceConfiguration, key: string, withValue: (value: T) => void): void {
    const configSetting = config.inspect(key);
    if (!configSetting) {
        return;
    }

    // Make sure the user has actually set the value.
    // VS Code will return the default values instead of `undefined`, even if user has not don't set anything.
    if (typeof configSetting.globalValue === 'undefined' && typeof configSetting.workspaceFolderValue === 'undefined' && typeof configSetting.workspaceValue === 'undefined') {
        return;
    }

    const value = config.get<T | undefined>(key, undefined);
    if (typeof value !== 'undefined') {
        withValue(value);
    }
}
