import { config } from "../../blog.config";
import appRootPath from "app-root-path";
import * as path from "path";
import { promises as fs } from "fs";
import { getNote } from "./getNote";
import { Note } from "../@types/note";

const rootPath = appRootPath.toString();
const { blogDir } = config;
const contentsPath = path.resolve(rootPath, "contents");
const noteDirPath = path.resolve(contentsPath, blogDir);

export const getNotes = async (): Promise<Note[]> => {
  const noteFilenames = await fs.readdir(noteDirPath);
  const createNotePromises = noteFilenames
    .map((filename) => path.basename(filename, ".md"))
    .map((slug) => {
      console.log(slug);
      return slug;
    })
    .map(getNote);
  return Promise.all(createNotePromises);
};
