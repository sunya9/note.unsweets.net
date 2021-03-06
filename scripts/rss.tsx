import { format } from "date-fns";
import { promises as fs } from "fs";
import Markdown from "markdown-to-jsx";
import mkdirp from "mkdirp";
import * as path from "path";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { config } from "../blog.config";
import { Note } from "../src/@types/note";
import { getNotes } from "../src/util/getNotes";

const { baseUrl } = config;

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
      <![CDATA[${md2html(note.body)} ]]>
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

const md2html = (markdown: string) =>
  ReactDOMServer.renderToString(<Markdown>{markdown}</Markdown>);

main();
