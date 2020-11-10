import { format } from "date-fns";
import { promises as fs } from "fs";
import mkdirp from "mkdirp";
import * as path from "path";
import { config } from "../../blog.config";
import { Note } from "../@types/note";
import { getNotes } from "../util/getNotes";

const baseUrl = process.env.VERCEL_URL;

const formatDate = (date: number) =>
  format(date, "E, dd MMM yyyy HH:mm:ss xxxx");

const main = async () => {
  const notes = await getNotes();
  const rssXml = generateRss(notes);
  const publicDir = path.resolve(__dirname, "../", "public");
  await mkdirp(publicDir);
  return fs.writeFile(path.resolve(publicDir, "rss.xml"), rssXml, "utf-8");
};

const formatNote = (note: Note) => `
  <item>
    <title>${note.title}</title>
    <link>${baseUrl}/notes/${note.slug}</link>
    <pubDate>${formatDate(note.createdAt)}</pubDate>
    <description>
      <![CDATA[${note.body} ]]>
    </description>
  </item>
  `;

const generateRss = (notes: Note[]) => {
  const latestNoteDate = formatDate(notes[0].createdAt);
  return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
      <title>${config.title()}</title>
      <link>${baseUrl}</link>
      <description>${config.description}</description>
      <language>ja</language>
      <lastBuildDate>${latestNoteDate}</lastBuildDate>
      ${notes.map(formatNote)}
    </channel>
  </rss>`;
};

main();
