import { GetStaticProps } from "next";
import Link from "next/link";
import { Note } from "../@types/note";
import { getNotes } from "../util/getNotes";

interface Props {
  notes: Note[];
}

export default function Home(props: Props) {
  return (
    <>
      <h1>最近の10件</h1>
      <ul>
        {props.notes.map((note) => (
          <li key={note.slug}>
            {new Date(note.createdAt).toLocaleDateString("ja")}{" "}
            <Link href={`/notes/${note.slug}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/notes">全てのノートを見る</Link>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await getNotes();
  return {
    props: {
      notes: notes.slice(0, 10),
    },
  };
};
