import { GetStaticProps } from "next";
import Link from "next/link";
import { Note } from "../../@types/note";
import { AppHead } from "../../components/AppHead";
import { getNotes } from "../../util/getNotes";

interface Props {
  notes: Note[];
}

export default function Notes(props: Props) {
  return (
    <>
      <AppHead title="全てのノート" />
      <h1>全てのノート</h1>
      <ul>
        {props.notes.map((note) => (
          <li key={note.slug}>
            {new Date(note.createdAt).toLocaleDateString("ja")}{" "}
            <Link href={`/notes/${note.slug}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await getNotes();
  return {
    props: {
      notes,
    },
  };
};
