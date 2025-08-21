

const assert = require('assert');
const { commands, Uri } = require('vscode');
const { join, basename, dirname } = require('path');
const fs = require('fs');

/**
 * Asserts that syntax tokens for a test fixture remain unchanged from baseline
 * @param {string} testFixturePath - Path to the test fixture file
 * @param {(error?: any) => void} done - Mocha callback function
 */
function assertUnchangedTokens(testFixturePath, done) {
    const fileName = basename(testFixturePath);

    commands.executeCommand('_workbench.captureSyntaxTokens', Uri.file(testFixturePath)).then(data => {
        try {
            const resultsFolderPath = join(dirname(dirname(testFixturePath)), 'colorize-results');
            if (!fs.existsSync(resultsFolderPath)) {
                fs.mkdirSync(resultsFolderPath);
            }

            const resultPath = join(resultsFolderPath, fileName.replace('.', '_') + '.json');
            if (fs.existsSync(resultPath)) {
                const previousData = JSON.parse(fs.readFileSync(resultPath).toString());
                try {
                    assert.deepEqual(data, previousData);
                } catch (error) {
                    fs.writeFileSync(resultPath, JSON.stringify(data, null, '\t'), { flag: 'w' });
                    if (Array.isArray(data) && Array.isArray(previousData) && data.length === previousData.length) {
                        for (let i = 0; i < data.length; i++) {
                            const currentToken = data[i];
                            const previousToken = previousData[i];
                            if (currentToken.c !== previousToken.c || hasThemeChange(currentToken.r, previousToken.r)) {
                                throw error;
                            }
                        }
                        // Different but no tokenization or color change: no failure
                    } else {
                        throw error;
                    }
                }
            } else {
                fs.writeFileSync(resultPath, JSON.stringify(data, null, '\t'));
            }
            done();
        } catch (error) {
            done(error);
        }
    }, (error) => done(error));
}

/**
 * Checks if there are theme-related color changes between two token render objects
 * @param {Record<string, any>} current - Current token render object
 * @param {Record<string, any>} previous - Previous token render object
 * @returns {boolean} True if theme changes detected, false otherwise
 */
function hasThemeChange(current, previous) {
    const keys = Object.keys(current);
    for (const key of keys) {
        if (current[key] !== previous[key]) {
            return true;
        }
    }
    return false;
}

suite('colorization', () => {
    const extensionColorizeFixturePath = join(__dirname, 'colorize-fixtures');
    if (fs.existsSync(extensionColorizeFixturePath)) {
        const fixtureFiles = fs.readdirSync(extensionColorizeFixturePath);
        fixtureFiles.forEach(fixtureFile => {
            // Define a test for each fixture
            test(fixtureFile, function (done) {
                assertUnchangedTokens(join(extensionColorizeFixturePath, fixtureFile), done);
            });
        });
    }
});
