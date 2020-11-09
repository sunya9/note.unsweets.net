import { config } from "../../blog.config";
import * as path from "path";
import { promises as fs } from "fs";
import { getNote } from "./getNote";
import { Note } from "../@types/note";

const { noteDirPath } = config;

export const getNotes = async (limit?: number): Promise<Note[]> => {
  const noteFilenames = await fs.readdir(noteDirPath);
  const createNotePromises = noteFilenames.map(async (name) =>
    getNote(path.basename(name, ".md"))
  );
  return Promise.all(createNotePromises).then((notes) =>
    notes
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit || notes.length)
  );
};
