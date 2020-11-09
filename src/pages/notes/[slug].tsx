import { GetStaticPaths, GetStaticProps } from "next";
import { Note } from "../../@types/note";
import { AppFooter } from "../../components/AppFooter";
import { AppHeader } from "../../components/AppHeader";
import { AppLayout } from "../../components/AppLayout";
import { getNote } from "../../util/getNote";
import { getNotes } from "../../util/getNotes";
import Markdown from "markdown-to-jsx";
import { NextLinkIfInternalAnchor } from "../../components/NextLinkIfInternalAnchor";
import { AppContents } from "../../components/AppContents";

interface Props {
  note: Note;
}

const formatDate = (dateMs: number) => {
  const date = new Date(dateMs);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default function NotePage(props: Props) {
  const { note } = props;
  return (
    <AppLayout>
      <AppHeader />
      <AppContents>
        <article>
          <h1>{note.title}</h1>
          <p>
            published: <time>{formatDate(note.createdAt)}</time>{" "}
            {note.createdAt !== note.createdAt && (
              <>
                updated: <time>{formatDate(note.updatedAt)}</time>
              </>
            )}
          </p>

          <Markdown
            options={{
              overrides: {
                a: {
                  component: NextLinkIfInternalAnchor,
                },
              },
            }}
          >
            {note.body}
          </Markdown>
        </article>
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
