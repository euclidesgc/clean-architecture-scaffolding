import { mkdirSync } from "fs";
import { Uri, window } from "vscode";
import * as utils from "../utils/tools";

export async function createFolders(uri: Uri) {
  const featureName = await window.showInputBox({
    title: "New Feature Folders",
    prompt: "Feature name?",
    placeHolder: "Ex: login or get_products",
    validateInput: function (value: string) {
      if (!value || value?.includes(" ")) {
        return "Feature name is required! and spaces are not allowed!";
      }
    },
  });

  if (!featureName) {
    return;
  }

  const clickedFolder = utils.getClickedFolder(uri);

  const rootFolder = utils.getRootFolder(uri);

  const folderList = await utils.getExtensionFileTemplates();

  const packageName = await utils.getPackageName(uri);

  if (folderList && Array.isArray(folderList)) {
    try {
      let featureFolder = "";

      folderList.forEach((element) => {
        featureFolder = element.replaceName("{{feature_name}}", featureName);
        featureFolder = featureFolder.replaceName(
          "{{custom_folder}}",
          clickedFolder
        );
        featureFolder = featureFolder.replaceName(
          "{{package_name}}",
          packageName
        );
        featureFolder = featureFolder.replaceName(
          "{{root_folder}}",
          rootFolder
        );

        featureFolder = featureFolder.replaceName(
          "{{feature_name.lowerCase}}",
          featureName
        );
        featureFolder = featureFolder.replaceName(
          "{{custom_folder.lowerCase}}",
          clickedFolder
        );
        featureFolder = featureFolder.replaceName(
          "{{package_name.lowerCase}}",
          packageName
        );
        featureFolder = featureFolder.replaceName(
          "{{root_folder.lowerCase}}",
          rootFolder
        );

        featureFolder = featureFolder.replaceName(
          "{{feature_name.upperCase}}",
          featureName
        );
        featureFolder = featureFolder.replaceName(
          "{{custom_folder.upperCase}}",
          clickedFolder
        );
        featureFolder = featureFolder.replaceName(
          "{{package_name.upperCase}}",
          packageName
        );
        featureFolder = featureFolder.replaceName(
          "{{root_folder.upperCase}}",
          rootFolder
        );

        featureFolder = featureFolder.replaceName(
          "{{feature_name.snakeCase}}",
          featureName
        );
        featureFolder = featureFolder.replaceName(
          "{{custom_folder.snakeCase}}",
          clickedFolder
        );
        featureFolder = featureFolder.replaceName(
          "{{package_name.snakeCase}}",
          packageName
        );
        featureFolder = featureFolder.replaceName(
          "{{root_folder.snakeCase}}",
          rootFolder
        );

        featureFolder = featureFolder.replaceName(
          "{{feature_name.pascalCase}}",
          featureName
        );
        featureFolder = featureFolder.replaceName(
          "{{custom_folder.pascalCase}}",
          clickedFolder
        );
        featureFolder = featureFolder.replaceName(
          "{{package_name.pascalCase}}",
          packageName
        );
        featureFolder = featureFolder.replaceName(
          "{{root_folder.pascalCase}}",
          rootFolder
        );

        featureFolder = featureFolder.replaceName(
          "{{feature_name.camelCase}}",
          featureName
        );
        featureFolder = featureFolder.replaceName(
          "{{custom_folder.camelCase}}",
          clickedFolder
        );
        featureFolder = featureFolder.replaceName(
          "{{package_name.camelCase}}",
          packageName
        );
        featureFolder = featureFolder.replaceName(
          "{{root_folder.camelCase}}",
          rootFolder
        );

        featureFolder = featureFolder.substring(
          0,
          featureFolder.lastIndexOf("/")
        );

        mkdirSync(featureFolder, { recursive: true });
      });
    } catch (err) {
      window.showInformationMessage(`${err}`);
      throw err;
    }
  }
}
