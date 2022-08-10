import * as fs from "fs";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "Clean Architecture Scaffolding" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "clean-architecture-scaffolding.createNewFeature",
    async (uri: vscode.Uri) => {
      const userFeatureName = await vscode.window.showInputBox({
        prompt: "Feature name?",
        placeHolder: "Ex: login or get_products",
      });

      if (!userFeatureName) {
        vscode.window.showErrorMessage("Feature name is required!");
        return;
      }

      if (userFeatureName?.includes(" ")) {
        vscode.window.showErrorMessage("Spaces are not allowed!");
        return;
      }

      let folderList = [];
      let tempPath = "";

      // /Users/colaborador/development/grupo_boticario/beleza_app/lib
      const rootFolder = uri.fsPath;

      // /Users/colaborador/development/grupo_boticario/beleza_app/test
      const testFolder = uri.fsPath.replace(
        new RegExp("\\b" + "/lib" + "\\b"),
        "/test"
      );

      //domain
      tempPath = `${userFeatureName}/domain/entities/`;
      folderList.push(tempPath);
      tempPath = `${userFeatureName}/domain/usecases/`;
      folderList.push(tempPath);
      tempPath = `${userFeatureName}/domain/errors/`;
      folderList.push(tempPath);
      tempPath = `${userFeatureName}/domain/repositories/`;
      folderList.push(tempPath);

      //infra
      tempPath = `${userFeatureName}/infra/datasources/`;
      folderList.push(tempPath);
      tempPath = `${userFeatureName}/infra/repositories/`;
      folderList.push(tempPath);

      //external
      tempPath = `${userFeatureName}/external/datasources/`;
      folderList.push(tempPath);
      tempPath = `${userFeatureName}/external/models`;
      folderList.push(tempPath);

      //presenter
      tempPath = `${userFeatureName}/presenter/pages/`;
      folderList.push(tempPath);

      try {
        folderList.forEach((element) => {
          fs.mkdirSync(`${rootFolder}\/${element}`, { recursive: true });
          fs.mkdirSync(`${testFolder}\/${element}`, { recursive: true });
        });
      } catch (err) {
        console.log("Error", err);
        throw err;
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
