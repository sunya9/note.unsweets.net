import { GetStaticPaths, GetStaticProps } from "next";
import { Note } from "../../@types/note";
import { AppFooter } from "../../components/AppFooter";
import { AppHeader } from "../../components/AppHeader";
import { AppLayout } from "../../components/AppLayout";
import { getNote } from "../../util/getNote";
import { getNotes } from "../../util/getNotes";
import { AppContents } from "../../components/AppContents";
import Head from "next/head";
import { useConfigContext } from "../../components/ConfigProvider";
import { NoteView } from "../../components/NoteView";

interface Props {
  note: Note;
}

export default function NotePage(props: Props) {
  const { note } = props;
  const config = useConfigContext();
  return (
    <AppLayout>
      <Head>
        <title key="title">{config.title(note.title)}</title>
      </Head>
      <AppHeader />
      <AppContents>
        <NoteView note={note} />
      </AppContents>
      <AppFooter />
    </AppLayout>
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
