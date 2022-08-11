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

      const customFolder = uri.fsPath;

      // /Users/colaborador/development/grupo_boticario/beleza_app/lib
      let indexOfLibFolder = customFolder.indexOf("/lib", 0);
      const rootFolder = customFolder.substring(0, indexOfLibFolder) + "/lib";

      let folderList = vscode.workspace
        .getConfiguration("scaffolding")
        .get("layers.templates");

      let makeTestFolder = vscode.workspace
        .getConfiguration("scaffolding")
        .get("layers.test");

      if (folderList && Array.isArray(folderList)) {
        try {
          let featureFolder = "";

          folderList.forEach((element) => {
            featureFolder = element.replaceAll("{root_folder}", rootFolder);
            featureFolder = featureFolder.replaceAll(
              "{custom_folder}",
              customFolder
            );
            featureFolder = featureFolder.replaceAll(
              "{feature_name}",
              userFeatureName
            );

            const testFeatureFolder = featureFolder.replace("/lib", "/test");

            fs.mkdirSync(featureFolder, { recursive: true });

            if (makeTestFolder) {
              fs.mkdirSync(testFeatureFolder, { recursive: true });
            }
          });
        } catch (err) {
          console.log("Error", err);
          throw err;
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
