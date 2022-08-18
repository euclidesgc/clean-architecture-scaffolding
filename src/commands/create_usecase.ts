import { pascalCase, snakeCase } from "change-case";
import { readFileSync, writeFile } from "fs";
import { Uri, window, workspace } from "vscode";
import * as utils from "../utils/tools";

export async function createUsecase(uri: Uri) {
  const customFolder = uri.fsPath;
  const indexOfLibFolder = customFolder.indexOf("/lib", 0);
  
  const folderList = workspace
    .getConfiguration("scaffolding")
    .get("layers.templates");

  const usecaseName = await utils.promptForUser({
    title: "Create usecase",
    prompt: "Usecase name? (please, prefer snake_case mode)",
    placeHolder: "Ex: get_products, user_register, etc",
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
      let templatesMap = new Map<string, string>();

      templatesList.forEach(async (element: string) => {
        const templateFileNameWithExtension = element.substring(
          element.lastIndexOf("/") + 1,
          element.length
        );

        // element      =                                            '{custom_folder}/{feature_name}/domain/usecases/usecase_interface.template'
        // customFolder = '/Users/colaborador/development/grupo_boticario/menu/lib/src/login_feature/domain/usecases'

        const useCaseFileName = `${customFolder}/${templateFileNameWithExtension
          .replaceName("{{usecase_name.snakeCase}}", usecaseName)
          .replace(".template", ".dart")}`;

        let templateFile = `${customFolder.substring(
          0,
          indexOfLibFolder
        )}/.my_templates/${templateFileNameWithExtension}`;

        let templateContent = readFileSync(templateFile, "utf8");

        if (templateContent && templateContent !== null) {
          templatesMap.set(useCaseFileName, templateContent);
        }
      });

      if (templatesMap) {
        templatesMap.forEach((content, filePath) => {
          content = content.replaceName(
            `{{usecase_name.pascalCase}}`,
            usecaseName
          );
          content = content.replaceName(
            `{{usecase_name.snakeCase}}`,
            usecaseName
          );

          content = content.replaceName(
            `{{usecase_name.camelCase}}`,
            usecaseName
          );

          templatesMap.set(filePath, content);

          //grava aquivo na pasta correta
          writeFile(filePath, content, "utf8", (error) => {
            console.log("Error", error);
          });
        });
      }
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
}
