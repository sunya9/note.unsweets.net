import { config } from "../../blog.config";
import * as path from "path";

const { blogDir } = config;

export interface FileOrDir {
  dir: boolean;
  mdName: string;
  slug: string;
}

export const getNotePath = (fileOrDir: FileOrDir) => {
  if (fileOrDir.dir) {
    return path.format({
      dir: path.resolve(config.noteDirPath, fileOrDir.slug),
      name: fileOrDir.mdName,
    });
  } else {
    return path.format({
      dir: config.noteDirPath,
      name: fileOrDir.mdName,
    });
  }
};
