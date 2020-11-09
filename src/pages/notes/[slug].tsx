import { GetStaticPaths, GetStaticProps } from "next";
import { Note } from "../../@types/note";
import { AppFooter } from "../../components/AppFooter";
import { AppHeader } from "../../components/AppHeader";
import { AppLayout } from "../../components/AppLayout";
import { getNote } from "../../util/getNote";
import { getNotes } from "../../util/getNotes";

interface Props {
  note: Note;
}
export default function NotePage(props: Props) {
  const { note } = props;
  return (
    <AppLayout>
      <AppHeader />
      <main>
        <article>
          <header>
            <h1>{note.title}</h1>
            <p>
              created: <time>{note.createdAt}</time>
              updated: <time>{note.updatedAt}</time>
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: note.body }} />
        </article>
      </main>
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
