import { GetStaticPaths, GetStaticProps } from "next";
import { Note } from "../../@types/note";
import { AppHead } from "../../components/AppHead";
import { NoteView } from "../../components/NoteView";
import { getNote } from "../../util/getNote";
import { getNotes } from "../../util/getNotes";

interface Props {
  note: Note;
}

export default function NotePage(props: Props) {
  const { note } = props;
  return (
    <>
      <AppHead title={note.title} />
      <NoteView note={note} />
    </>
  );
}

type ParamsType = { slug: string };

export const getStaticPaths: GetStaticPaths<ParamsType> = async () => {
  const paths = await getNotes().then((notes) =>
    notes.map((note): { params: ParamsType } => ({
      params: {
        slug: note.slug,
      },
    }))
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, ParamsType> = async ({
  params: { slug },
}) => {
  return {
    props: {
      note: await getNote(slug),
    },
  };
};
