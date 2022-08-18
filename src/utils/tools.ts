import { camelCase, pascalCase, snakeCase } from "change-case";
import * as vscode from "vscode";
import { PromptOptions } from "./PromptOptions";

export function validateFeatureName(featureName?: string): boolean {
  return !featureName || featureName?.includes(" ");
}

export function promptForUser(
  options: PromptOptions
): Thenable<string | undefined> {
  const option: vscode.InputBoxOptions = {
    prompt: options.prompt,
    placeHolder: options.placeHolder,
    title: options.title,
    value: options.value,
  };

  return vscode.window.showInputBox(option);
}

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
