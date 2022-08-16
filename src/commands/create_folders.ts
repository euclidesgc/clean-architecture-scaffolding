import { mkdirSync } from "fs";
import { Uri, window, workspace } from "vscode";

export async function createFolders(uri: Uri) {
  const userFeatureName = await window.showInputBox({
    prompt: "Feature name?",
    placeHolder: "Ex: login or get_products",
  });

  if (!userFeatureName || userFeatureName?.includes(" ")) {
    window.showErrorMessage(
      "Feature name is required! and spaces are not allowed!"
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

        featureFolder = featureFolder.substring(
          0,
          featureFolder.lastIndexOf("/")
        );

        const testFeatureFolder = featureFolder.replace("/lib", "/test");

        mkdirSync(featureFolder, { recursive: true });

        if (makeTestFolder) {
          mkdirSync(testFeatureFolder, { recursive: true });
        }
      });
    } catch (err) {
      console.log("Error", err);
      throw err;
    }
  }
}
