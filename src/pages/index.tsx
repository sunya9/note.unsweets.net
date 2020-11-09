import { GetStaticProps } from "next";
import { Note } from "../@types/note";
import { AppFooter } from "../components/AppFooter";
import { AppHeader } from "../components/AppHeader";
import { AppLayout } from "../components/AppLayout";
import { getNotes } from "../util/getNotes";
import Link from "next/link";
import { AppContents } from "../components/AppContents";

interface Props {
  notes: Note[];
}

export default function Home(props: Props) {
  return (
    <AppLayout>
      <AppHeader />
      <AppContents>
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
      </AppContents>
      <AppFooter />
    </AppLayout>
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
