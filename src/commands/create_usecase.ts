import { pascalCase, snakeCase } from "change-case";
import { readFileSync } from "fs";
import { Uri, window, workspace } from "vscode";
import { promptForUser } from "../utils/tools";

export async function createUsecase(uri: Uri) {
  const customFolder = uri.fsPath;
  const indexOfLibFolder = customFolder.indexOf("/lib", 0);
  const rootFolder = customFolder.substring(0, indexOfLibFolder) + "/lib";

  const folderList = workspace
    .getConfiguration("scaffolding")
    .get("layers.templates");

  const makeTestFolder = workspace
    .getConfiguration("scaffolding")
    .get("layers.test");

  const usecaseName = await promptForUser({
    title: "Create usecase",
    prompt: "Usecase name? (please, use snake_case mode)",
    placeHolder: "Ex: get_products the result will be get_products_usecase",
  });

  if (!usecaseName || usecaseName?.includes(" ")) {
    window.showErrorMessage(
      "Usecase name is required and spaces are not allowed!"
    );
    return;
  }

  if (folderList && Array.isArray(folderList)) {
    const templatesList = folderList.filter((element) => {
      return element.endsWith(".template");
    });

    try {
      let featureFolder = "";
      let templatesMap = new Map<string, string>();

      templatesList.forEach(async (element: string) => {
        const templateFileNameWithExtension = element.substring(
          element.lastIndexOf("/") + 1,
          element.length
        );

        // element      =                                            '{custom_folder}/{feature_name}/domain/usecases/usecase_interface.template'
        // customFolder = '/Users/colaborador/development/grupo_boticario/menu/lib/src/login_feature/domain/usecases'

        const useCaseFileName = `${customFolder}/${snakeCase(usecaseName)}_usecase.dart`;
          

        let templateFilePath = `${customFolder.substring(
          0,
          indexOfLibFolder
        )}/.my_templates/${templateFileNameWithExtension}`;

        let templateContent = readFileSync(templateFilePath, "utf8");

        if (templateContent && templateContent !== null) {
          templatesMap.set(useCaseFileName, templateContent);
        }
      });

      console.log(templatesMap);

      if (templatesMap) {
        templatesMap.forEach((value, key) => {
          let fileName = key;
          let content = value;

          content = content.replaceAll(
            `{informedUseCaseName.pascalCase}`,
            pascalCase(usecaseName)
          );
          content = content.replaceAll(
            `{informedUseCaseName.snakeCase}`,
            snakeCase(usecaseName)
          );

          templatesMap.set(key, content);
          //grava aquivo na pasta correta
        });

        //este arquivo deve ser gravado no local correto
        console.log(templatesMap);
      }
    } catch (err) {
      console.log("Error", err);
      throw err;
    }
  }
}
