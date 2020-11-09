import { promises as fs } from "fs";
import { exec } from "child_process";
import { promisify } from "util";
import { Note } from "../@types/note";
import { getNotePath } from "./getNotePath";

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

export const getNote = async (slug: string): Promise<Note> => {
  const noteAbsPath = getNotePath(slug);
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
    slug,
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
