import { camelCase, pascalCase, snakeCase } from "change-case";
import * as fs from "fs";
import * as vscode from "vscode";
import path = require("path");



declare global {
  interface String {
    replaceName(searchTerm: string, replaceFor: string): string;
  }
}

String.prototype.replaceName = function (
  searchTerm: string,
  replaceFor: string
): string {
  let targetText = this;

  if (searchTerm.includes("lowerCase")) {
    targetText = targetText.replaceAll(searchTerm, replaceFor.toLowerCase());
  }

  if (searchTerm.includes("upperCase")) {
    targetText = targetText.replaceAll(searchTerm, replaceFor.toUpperCase());
  }

  if (searchTerm.includes("snakeCase")) {
    targetText = targetText.replaceAll(searchTerm, snakeCase(replaceFor));
  }

  if (searchTerm.includes("pascalCase")) {
    targetText = targetText.replaceAll(searchTerm, pascalCase(replaceFor));
  }

  if (searchTerm.includes("camelCase")) {
    targetText = targetText.replaceAll(searchTerm, camelCase(replaceFor));
  }

  targetText = targetText.replaceAll(searchTerm, replaceFor);

  return `${targetText}`;
};

export function getClickedFolder(uri: vscode.Uri): string {
  return uri.fsPath;
}

export function getRootFolder(uri: vscode.Uri): string {
  return vscode.workspace.getWorkspaceFolder(uri)?.uri.fsPath!;
}

export function getPackageName(uri: vscode.Uri): string {
  const pubspec = _loadPubspec(uri);

  return pubspec.name;
}

export async function getExtensionFileTemplates(): Promise<string> {
  return await vscode.workspace.getConfiguration("scaffolding").get("layers.templates")!;
}

function _loadPubspec(uri: vscode.Uri): any {
  const yaml = require('js-yaml');

  const pubspecPath =  _pubspecPath(uri);

  if (fs.existsSync(pubspecPath)) {
    return yaml.load(fs.readFileSync(pubspecPath, 'utf8'));
  }

  return vscode.window.showErrorMessage(
    "pubspec.yaml is missing."
  );
}

function _pubspecPath(uri: vscode.Uri): string {
  return path.join(getRootFolder(uri), "pubspec.yaml");
}

// export const getWorkspaceFolder = (): string => {
//   const folders = vscode.workspace.workspaceFolders;

//   if (folders === undefined) {
//     return '';
//   }

//   const folder = folders[0] || {};
//   const uri = folder.uri;

//   return uri.fsPath;
// };