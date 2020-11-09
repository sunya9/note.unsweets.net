import appRootPath from "app-root-path";
import * as path from "path";
const rootPath = appRootPath.toString();

const title = "あああ";
const description = "web開発やらAndroidに関するノート。";
const blogDir = "notes";
const contentsPath = path.resolve(rootPath, "contents");
const noteDirPath = path.resolve(contentsPath, blogDir);

export const config = {
  title: (pageTitle?: string) =>
    pageTitle ? `${pageTitle} - ${title}` : title,
  description,
  blogDir,
  noteDirPath,
  contentsPath,
} as const;
