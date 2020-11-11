# RSSを生成する
このブログ記事としてmarkdownから生成しているページの更新情報をRSSとして出力したい。フレームワークはNext.jsだが、あまり関係はない。

手順としては
1. 記事のmarkdownをロードする
2. markdownをパースしてタイトルと本文に分ける
3. 雑にstring interpolationで埋め込む
4. 生成したテキストを`rss.xml`などとしてpublicディレクトリに放り込む

```tsx
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
  await mkdirp(publicDir);
  return fs.writeFile(path.resolve('<public dir>', "rss.xml"), rssXml, "utf-8");
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
```
日付部分の処理は手抜きをしたいのでdate-fnsを利用した。pubDateはRFC1123に則ったフォーマットである必要があり、これに対応するような省略できる記述方法はなかったので`E, dd MMM yyyy HH:mm:ss xxxx`という表記になった。

markdownからhtmlの出力には記事本文と同じmarkdown-to-tsxを使っているが、これは同じ結果を期待したいため（記事本文はoverridesオプションを使っているので厳密には同じではないが…）。このため無駄にtsx拡張子となっている。

next.jsはsrcディレクトリにpagesディレクトリを入れるがpublicはプロジェクトルートにおいておく必要がある。少し時間を溶かした。

---

tsのソースコード例は型のimportまで表記しないと傍から見てわかりにくくなるところがjsと比べてデメリットかも知れない。