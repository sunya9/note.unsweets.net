import { exec } from "child_process";
import { promises as fs } from "fs";
import * as path from "path";
import { promisify } from "util";
import { config } from "../../blog.config";
import { Note } from "../@types/note";
import { FileOrDir, getNotePath } from "./getNotePath";

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
  const commitDateListPromise = execPromise(
    `git log --format=%cd --date=iso ${noteAbsPath}`
  ).then(({ stdout }) => stdout.trim().split("\n"));
  const readFilePromise = fs.readFile(noteAbsPath, "utf-8");
  const [commitDateList, contents] = await Promise.all([
    commitDateListPromise,
    readFilePromise,
  ]);
  console.log("commitDateList", commitDateList);
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
