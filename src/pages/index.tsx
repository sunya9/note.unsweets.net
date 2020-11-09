import { GetStaticProps } from "next";
import { Note } from "../@types/note";
import { AppFooter } from "../components/AppFooter";
import { AppHeader } from "../components/AppHeader";
import { AppLayout } from "../components/AppLayout";
import { getNotes } from "../util/getNotes";
import Link from "next/link";

interface Props {
  notes: Note[];
}

export default function Home(props: Props) {
  return (
    <AppLayout>
      <AppHeader />
      <main>
        <ul>
          {props.notes.map((note) => (
            <li key={note.slug}>
              <Link href={`/notes/${note.slug}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <AppFooter />
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await getNotes().catch((err) => console.error(err));
  if (!notes) return { notFound: true };
  console.log("notes", notes);
  return {
    props: {
      notes: notes.slice(0, 10),
    },
  };
};
