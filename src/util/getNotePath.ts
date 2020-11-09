import { config } from "../../blog.config";
import appRootPath from "app-root-path";
import * as path from "path";

const rootPath = appRootPath.toString();
const { blogDir } = config;
const contentsPath = path.resolve(rootPath, "contents");
const blogDirPath = path.resolve(contentsPath, blogDir);

export const getNotePath = (slug: string) => {
  const notePath = path.format({
    dir: blogDirPath,
    name: slug,
    ext: ".md",
  });
  return notePath;
};
