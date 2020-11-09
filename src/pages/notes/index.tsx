import { GetStaticProps } from "next";
import { Note } from "../../@types/note";
import { AppFooter } from "../../components/AppFooter";
import { AppHeader } from "../../components/AppHeader";
import { AppLayout } from "../../components/AppLayout";
import { getNotes } from "../../util/getNotes";
import Link from "next/link";
import { AppContents } from "../../components/AppContents";
import { useConfigContext } from "../../components/ConfigProvider";
import Head from "next/head";

interface Props {
  notes: Note[];
}

export default function Notes(props: Props) {
  const config = useConfigContext();
  return (
    <AppLayout>
      <Head>
        <title key="title">{config.title("全てのノート")}</title>
      </Head>
      <AppHeader />
      <AppContents>
        <h1>全てのノート</h1>
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
  const notes = await getNotes();
  return {
    props: {
      notes,
    },
  };
};
