// import * as vscode from "vscode";
import * as fs from "fs";
import * as vscode from "vscode";
import { createFolders } from "./commands/create_folders";
import { createUsecase } from "./commands/create_usecase";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    "clean-architecture-scaffolding.createFolders",
    async (uri: vscode.Uri) => {
      await createFolders(uri);
    }
  );

  vscode.commands.registerCommand(
    "clean-architecture-scaffolding.createUsecase",
    async (uri: vscode.Uri) => {
      if (await templatesOk(uri)) {
        await createUsecase(uri);
      } else {
        vscode.window.showInformationMessage(
          `Tip: Look for templates in github: https://github.com/euclidesgc/clean-architecture-scaffolding/tree/main/.my_templates`
        );
        vscode.window.showErrorMessage(
          "Verify your templates files in Extension config and /.my_templates folder. Maybe some name is wrong..."
        );
      }
    }
  );

  async function templatesOk(uri: vscode.Uri): Promise<Boolean> {
    const folderList = (await vscode.workspace
      .getConfiguration("scaffolding")
      .get("layers.templates")) as Array<string>;

    const templateList = folderList.filter((element) =>
      element.endsWith(".template")
    );

    if (folderList.length <= 0 && templateList.length <= 0) {
      return false;
    }

    const rootFolder = uri.path.substring(0, uri.path.indexOf("/lib"));
    let fileName = "";

    if (templateList && templateList.length > 0) {
      for (const key in templateList) {
        if (Object.prototype.hasOwnProperty.call(templateList, key)) {
          const element = templateList[key];

          let fileName = element.substring(
            element.lastIndexOf("/") + 1,
            element.length
          );

          const templateFile = `${rootFolder}/.my_templates/${fileName}`;

          if (!fs.existsSync(templateFile)) {
            return false;
          }
        }
      }
    } else {
      return false;
    }

    return true;
  }

  // context.subscriptions.push(createNewFeature, createUseCase);
}

// this method is called when your extension is deactivated
// export function deactivate() {}
