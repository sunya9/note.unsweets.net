import { promises as fs } from "fs";
import { exec } from "child_process";
import { promisify } from "util";
import { Note } from "../@types/note";
import { FileOrDir, getNotePath } from "./getNotePath";
import * as path from "path";
import { config } from "../../blog.config";
const execPromise = promisify(exec);

const parseContents = (contents: string): Pick<Note, "body" | "title"> => {
  const lineSeparatedContents = contents.trim().split("\n");
  const [rawTitle, ...bodyList] = lineSeparatedContents;
  const body = bodyList.join("\n").trim();
  const title = rawTitle.replace(/^#\s?/, "");
  return {
    body,
    title,
  };
};

const getFileOrDir = async (slug: string): Promise<FileOrDir> => {
  console.log("path", path.resolve(config.noteDirPath, slug));
  const isDir = !!(await fs
    .stat(path.resolve(config.noteDirPath, slug))
    .catch(() => null));
  // if receive null, it is .md file
  return {
    dir: isDir,
    slug,
    mdName: isDir ? `index.md` : `${slug}.md`,
  };
};

export const getNote = async (name: string): Promise<Note> => {
  const fileOrDir = await getFileOrDir(name);
  const noteAbsPath = getNotePath(fileOrDir);
  console.log(noteAbsPath);
  const commitDateListPromise = execPromise(
    `git log --format=%cd --date=iso ${noteAbsPath}`
  ).then(({ stdout }) => stdout.split("\n"));
  const readFilePromise = fs.readFile(noteAbsPath, "utf-8");
  const [commitDateList, contents] = await Promise.all([
    commitDateListPromise,
    readFilePromise,
  ]);
  const updatedAt = getDate(commitDateList, 0);
  const createdAt = getDate(commitDateList, commitDateList.length - 1);
  const { title, body } = parseContents(contents);
  return {
    slug: name,
    title,
    body,
    updatedAt,
    createdAt,
  };
};

const getDate = (commitDateList: string[], index: number) => {
  const dateStr = commitDateList[index];
  const tempDateMs = new Date(dateStr).getTime();
  return isNaN(tempDateMs) ? new Date().getTime() : tempDateMs;
};
