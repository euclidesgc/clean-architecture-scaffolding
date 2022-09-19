import { camelCase, pascalCase, snakeCase } from "change-case";
import * as _ from "lodash";
import { Uri, window, workspace } from "vscode";
import { getPubspec } from "./get-pubspec";

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

export function getClickedFolder(uri: Uri): string {
  return uri.fsPath;
}

export function getRootFolder(uri: Uri): string {
  return workspace.getWorkspaceFolder(uri)?.uri.fsPath!;
}

export async function getPackageName(uri: Uri): Promise<string> {
  try {
    const pubspec = await getPubspec(getRootFolder(uri));
    const name = _.get(pubspec, "name", {});
    return name;
  } catch (error) {
    window.showErrorMessage("Error load pubspec.yaml");
    return "";
  }
}

export async function getExtensionFileTemplates(): Promise<string> {
  return await workspace
    .getConfiguration("scaffolding")
    .get("layers.templates")!;
}