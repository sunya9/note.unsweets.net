import { GetStaticProps } from "next";
import { Note } from "../../@types/note";
import { AppHead } from "../../components/AppHead";
import { NoteList } from "../../components/NoteList";
import { getNotes } from "../../util/getNotes";

interface Props {
  notes: Note[];
}

export default function Notes(props: Props) {
  return (
    <>
      <AppHead title="全てのノート" />
      <h1>全てのノート</h1>
      <NoteList notes={props.notes} />
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
