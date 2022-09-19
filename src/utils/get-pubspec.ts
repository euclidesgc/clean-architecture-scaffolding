import * as yaml from "js-yaml";
import * as path from "path";
import { Uri, workspace } from "vscode";

export async function getPubspec(rootFolder: string) {
  const pubspecPath = path.join(`${rootFolder}`, "pubspec.yaml");
  if (pubspecPath) {
    try {
      let content = await workspace.fs.readFile(Uri.file(pubspecPath));
      const pubspec = await yaml.load(content.toString());
      return pubspec;
    } catch (_) {
      console.log('Erro ao obter o pubspec.yaml');
    }
  }
}
