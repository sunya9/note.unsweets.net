import { GetStaticProps } from "next";
import { Note } from "../../@types/note";
import { AppFooter } from "../../components/AppFooter";
import { AppHeader } from "../../components/AppHeader";
import { AppLayout } from "../../components/AppLayout";
import { getNotes } from "../../util/getNotes";
import Link from "next/link";
import { AppContents } from "../../components/AppContents";

interface Props {
  notes: Note[];
}

export default function Notes(props: Props) {
  return (
    <AppLayout>
      <AppHeader />
      <AppContents>
        <ul>
          {props.notes.map((note) => (
            <li key={note.slug}>
              {new Date(note.createdAt).toLocaleDateString("ja")}{" "}
              <Link href={`/notes/${note.slug}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      </AppContents>
      <AppFooter />
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await getNotes().catch((err) => console.error(err));
  if (!notes) return { notFound: true };
  return {
    props: {
      notes: notes.slice(0, 10),
    },
  };
};
