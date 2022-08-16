import * as vscode from "vscode";

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

interface PromptOptions {
  title?: string;
  prompt?: string;
  placeHolder?: string;
  value?: string;
}
