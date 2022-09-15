import { camelCase, pascalCase, snakeCase } from "change-case";
import * as vscode from "vscode";


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
    targetText = targetText.replaceAll(searchTerm, replaceFor.toLowerCase);
  }

  if (searchTerm.includes("upperCase")) {
    targetText = targetText.replaceAll(searchTerm, replaceFor.toUpperCase);
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

export function getLibFolder(uri: vscode.Uri): string {
  const indexOfLibFolder = uri.fsPath.indexOf("/lib", 0);
  return uri.fsPath.substring(0, indexOfLibFolder + 4);
}

export async function getExtensionFileTemplates(): Promise<string> {
  return await vscode.workspace.getConfiguration("scaffolding").get("layers.templates")!;
}