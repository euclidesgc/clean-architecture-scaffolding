import { readFileSync, writeFile } from "fs";
import { Uri, window } from "vscode";
import * as utils from "../utils/tools";

export async function createUsecase(uri: Uri) {
  //Get the keywords values
  const clickedFolder = utils.getClickedFolder(uri);
  const rootFolder = utils.getRootFolder(uri);
  const filePathConfigList = await utils.getExtensionFileTemplates();
  const usecaseName = await getUsecaseName();
  const packageName = await utils.getPackageName(uri);

  //Se não informar o usecaseName não deve continuar
  if (!usecaseName) {
    return;
  }

  if (filePathConfigList && Array.isArray(filePathConfigList)) {
    const templatesList = getTemplatesFileList(filePathConfigList);
    let featureName: string;

    try {
      let templatesMap = new Map<string, string>();

      templatesList.forEach(async (element: string) => {
        featureName = getFeatureName(clickedFolder, element, uri);
        if (!featureName) {
          return;
        }

        const templateFileName = element.substring(
          element.lastIndexOf("/") + 1,
          element.length
        );

        const pathFileName = element
          .replaceName("{{feature_name}}", featureName)
          .replaceName("{{custom_folder}}", clickedFolder)
          .replaceName("{{usecase_name}}", usecaseName)
          .replaceName("{{package_name}}", packageName)
          .replaceName("{{root_folder}}", rootFolder)

          .replaceName("{{feature_name.lowerCase}}", featureName)
          .replaceName("{{custom_folder.lowerCase}}", clickedFolder)
          .replaceName("{{usecase_name.lowerCase}}", usecaseName)
          .replaceName("{{package_name.lowerCase}}", packageName)
          .replaceName("{{root_folder.lowerCase}}", rootFolder)

          .replaceName("{{feature_name.upperCase}}", featureName)
          .replaceName("{{custom_folder.upperCase}}", clickedFolder)
          .replaceName("{{usecase_name.upperCase}}", usecaseName)
          .replaceName("{{package_name.upperCase}}", packageName)
          .replaceName("{{root_folder.upperCase}}", rootFolder)

          .replaceName("{{feature_name.snakeCase}}", featureName)
          .replaceName("{{custom_folder.snakeCase}}", clickedFolder)
          .replaceName("{{usecase_name.snakeCase}}", usecaseName)
          .replaceName("{{package_name.snakeCase}}", packageName)
          .replaceName("{{root_folder.snakeCase}}", rootFolder)

          .replaceName("{{feature_name.pascalCase}}", featureName)
          .replaceName("{{custom_folder.pascalCase}}", clickedFolder)
          .replaceName("{{usecase_name.pascalCase}}", usecaseName)
          .replaceName("{{package_name.pascalCase}}", packageName)
          .replaceName("{{root_folder.pascalCase}}", rootFolder)

          .replaceName("{{feature_name.camelCase}}", featureName)
          .replaceName("{{custom_folder.camelCase}}", clickedFolder)
          .replaceName("{{usecase_name.camelCase}}", usecaseName)
          .replaceName("{{package_name.camelCase}}", packageName)
          .replaceName("{{root_folder.camelCase}}", rootFolder)

          .replaceAll(".template", ".dart");

        let templateFile = `${rootFolder}/.my_templates/${templateFileName}`;
        let templateContent = readFileSync(templateFile, "utf8");

        if (templateContent && templateContent !== null) {
          templatesMap.set(pathFileName, templateContent);
        }
        // console.log(pathFileName);
      });

      if (templatesMap) {
        templatesMap.forEach((content, filePath) => {
          content = content.replaceName("{{feature_name}}", featureName!);
          content = content.replaceName("{{custom_folder}}", clickedFolder);
          content = content.replaceName("{{usecase_name}}", usecaseName);
          content = content.replaceName("{{package_name}}", packageName);
          content = content.replaceName("{{root_folder}}", rootFolder);

          content = content.replaceName(
            "{{feature_name.lowerCase}}",
            featureName!
          );
          content = content.replaceName(
            "{{custom_folder.lowerCase}}",
            clickedFolder
          );
          content = content.replaceName(
            "{{usecase_name.lowerCase}}",
            usecaseName
          );
          content = content.replaceName(
            "{{package_name.lowerCase}}",
            packageName
          );
          content = content.replaceName(
            "{{root_folder.lowerCase}}",
            rootFolder
          );

          content = content.replaceName(
            "{{feature_name.upperCase}}",
            featureName!
          );
          content = content.replaceName(
            "{{custom_folder.upperCase}}",
            clickedFolder
          );
          content = content.replaceName(
            "{{usecase_name.upperCase}}",
            usecaseName
          );
          content = content.replaceName(
            "{{package_name.upperCase}}",
            packageName
          );
          content = content.replaceName(
            "{{root_folder.upperCase}}",
            rootFolder
          );

          content = content.replaceName(
            "{{feature_name.snakeCase}}",
            featureName!
          );
          content = content.replaceName(
            "{{custom_folder.snakeCase}}",
            clickedFolder
          );
          content = content.replaceName(
            "{{usecase_name.snakeCase}}",
            usecaseName
          );
          content = content.replaceName(
            "{{package_name.snakeCase}}",
            packageName
          );
          content = content.replaceName(
            "{{root_folder.snakeCase}}",
            rootFolder
          );

          content = content.replaceName(
            "{{feature_name.pascalCase}}",
            featureName!
          );
          content = content.replaceName(
            "{{custom_folder.pascalCase}}",
            clickedFolder
          );
          content = content.replaceName(
            "{{usecase_name.pascalCase}}",
            usecaseName
          );
          content = content.replaceName(
            "{{package_name.pascalCase}}",
            packageName
          );
          content = content.replaceName(
            "{{root_folder.pascalCase}}",
            rootFolder
          );

          content = content.replaceName(
            "{{feature_name.camelCase}}",
            featureName!
          );
          content = content.replaceName(
            "{{custom_folder.camelCase}}",
            clickedFolder
          );
          content = content.replaceName(
            "{{usecase_name.camelCase}}",
            usecaseName
          );
          content = content.replaceName(
            "{{package_name.camelCase}}",
            packageName
          );
          content = content.replaceName(
            "{{root_folder.camelCase}}",
            rootFolder
          );

          templatesMap.set(filePath, content);

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

async function getUsecaseName(): Promise<string | undefined> {
  const usecaseName = await window.showInputBox({
    title: "Create Usecase",
    prompt: "Usecase name? (please, prefer snake_case mode!)",
    placeHolder: "Ex: get_products -> get_products_usecase",
    validateInput: function (value: string) {
      if (!value || value?.includes(" ")) {
        return "Name is required! and spaces are not allowed!";
      }
    },
  });

  return usecaseName;
}

function getTemplatesFileList(filePathConfig: Array<string>) {
  const templatesList = filePathConfig.filter((element) => {
    return element.endsWith(".template");
  });
  return templatesList;
}

function getFeatureName(
  clickedFolder: string,
  template: string,
  uri: Uri
): string {
  let indexOfFeatureName = 0;
  template = template.replaceName("{{root_folder}}", utils.getRootFolder(uri));
  const templateArray = template.split("/");
  const clickedArray = clickedFolder.split("/");
  const featureName = templateArray.find(isFeature);
  if (featureName) {
    indexOfFeatureName = templateArray.indexOf(featureName, 0);
  }
  if (indexOfFeatureName > 0) {
    return clickedArray[indexOfFeatureName];
  } else {
    return "";
  }
}

function isFeature(item: string) {
  return item.includes("feature_name");
}
