import * as vscode from "vscode";
import { createFolders } from "./commands/create_folders";
import { createUsecase } from "./commands/create_usecase";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "Clean Architecture Scaffolding" is now active!'
  );

  vscode.commands.registerCommand(
    "clean-architecture-scaffolding.createFolders",
    async (uri: vscode.Uri) => {
      await createFolders(uri);
    }
  );

  vscode.commands.registerCommand(
    "clean-architecture-scaffolding.createUsecase",
    async (uri: vscode.Uri) => {
      await createUsecase(uri);
    }
  );

  // context.subscriptions.push(createNewFeature, createUseCase);
}

// this method is called when your extension is deactivated
// export function deactivate() {}
