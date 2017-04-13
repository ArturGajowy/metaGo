'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Config } from "./config";
import { MetaJumper } from './metajumper/metajumper';
import { CurrentLineScroller } from './current-line-scroller';
import { SpaceBlockJumper } from './space-block-jumper';
import { SelectLineUp } from './select-line-up';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "metago" is now active!');
    let config = new Config();
    config.loadConfig();
    // Event to update active configuration items when changed without restarting vscode
    vscode.workspace.onDidChangeConfiguration((e: void) => {
        config.loadConfig();
        metaJumper.updateConfig();
    });

    let metaJumper = new MetaJumper(context, config);
    let centerEditor = new CurrentLineScroller(context);
    let spaceBlockJumper = new SpaceBlockJumper(context);
    let selectLineUp = new SelectLineUp(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
}