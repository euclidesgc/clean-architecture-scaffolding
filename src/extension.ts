// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { MemFS } from "./fileSystemProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "Clean Architecture Scaffolding" is now active!'
  );

  const memFs = new MemFS();
  context.subscriptions.push(
    vscode.workspace.registerFileSystemProvider("memfs", memFs, {
      isCaseSensitive: true,
    })
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "clean-architecture-scaffolding.createNewFeature",
    async (uri: vscode.Uri) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      //   vscode.window.showInformationMessage(
      //     "Hello World from Clean Architecture Scaffolding!"
      //   );

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

      let rootFolder = uri.fsPath;

      let entitiesFolder = `${rootFolder}/${userFeatureName}/domain/entities/`;

      let usecasesFolder = `${rootFolder}/${userFeatureName}/domain/usecases/`;
      let errorsFolder = `${rootFolder}/${userFeatureName}/domain/errors/`;
      let repositoriesFolder = `${rootFolder}/${userFeatureName}/domain/repositories/`;

      let infraDatasourcesFolder = `${rootFolder}/${userFeatureName}/infra/datasources/`;
      let infraRepositoriesFolder = `${rootFolder}/${userFeatureName}/infra/repositories/`;

      let externalDatasourcesFolder = `${rootFolder}/${userFeatureName}/external/datasources/`;
      let externalModelsFolder = `${rootFolder}/${userFeatureName}/models`;

      let presenterFolder = `${rootFolder}/${userFeatureName}/presenter/pages/`;

      try {
        // create the directory
        //   memFs.createDirectory(vscode.Uri.parse(`memfs:/${entitiesFolder}/`));

        memFs.createDirectory(vscode.Uri.parse(`memfs:/teste/`));

        // this.duckFiles.forEach((file: string) => {
        //   const filename = `${file}${this.extension}`;
        //   const fullpath = path.join(absoluteDuckPath, filename);

        //   fs.writeFileSync(fullpath, `/* ${filename} */`);
        // });
      } catch (err) {
        // log?
        console.log("Error", err);

        throw err;
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
