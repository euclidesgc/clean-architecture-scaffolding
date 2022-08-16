import { pascalCase } from "change-case";
import { readFileSync } from "fs";
import { Uri, window, workspace } from "vscode";
import { promptForUser } from "./utils";

export async function createUsecase(uri: Uri) {


  const usecaseName = await promptForUser({
    title: 'Create usecase',
    prompt: "Usecase name? (please, use snake_case mode)",
    placeHolder: "Ex: get_products the result will be get_products_usecase",
  });

  if (!usecaseName || usecaseName?.includes(" ")) {
    window.showErrorMessage(
      "Usecase name is required and spaces are not allowed!"
    );
    return;
  }

  const customFolder = uri.fsPath;

  let indexOfLibFolder = customFolder.indexOf("/lib", 0);
  const rootFolder = customFolder.substring(0, indexOfLibFolder) + "/lib";

  let folderList = workspace
    .getConfiguration("scaffolding")
    .get("layers.templates");

  let makeTestFolder = workspace
    .getConfiguration("scaffolding")
    .get("layers.test");

  if (folderList && Array.isArray(folderList)) {
    try {
      let featureFolder = "";
      let templatesFileList = new Map<string, string>();

      //Pegar todos os templates em um array!
      folderList.forEach(async (element: string) => {
        if (element.endsWith(".template")) {
          let fileNameWithExtension: string = "";
          let fileName: string = "";
          let className = pascalCase(usecaseName);
          let templateFilePath: string = "";

          fileNameWithExtension = element.substring(
            element.lastIndexOf("/") + 1,
            element.length
          );

          fileName = fileNameWithExtension.substring(
            0,
            fileNameWithExtension.lastIndexOf(".")
          );

          templateFilePath = `${customFolder.substring(
            0,
            indexOfLibFolder
          )}/.my_templates/${fileNameWithExtension}`;

          let content = readFileSync(templateFilePath, "utf8");

          if (content && content !== null) {
            templatesFileList.set(fileName, content);
          }
        }
      });

      console.log(templatesFileList);

      //fazer replace em todos os templates
      if (templatesFileList) {
        const className = pascalCase(usecaseName);

        templatesFileList.forEach((value, key) => {
          const fileName = key;
          let content = value;

          content = content.replaceAll(`{{${fileName}.pascalCase}}`, className);

          content = content.replaceAll(
            `{{${fileName}.snakeCase}}`,
            usecaseName
          );

          templatesFileList.set(key, content);
        });

        //este arquivo deve ser gravado no local correto
        console.log(templatesFileList);
      }
    } catch (err) {
      console.log("Error", err);
      throw err;
    }
  }
}
