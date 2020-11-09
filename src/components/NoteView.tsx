import Markdown from "markdown-to-jsx";
import { NextLinkIfInternalAnchor } from "../components/NextLinkIfInternalAnchor";
import { Pre } from "../components/Pre";
import { Note } from "../@types/note";

interface Props {
  note: Note;
}

const formatDate = (dateMs: number) => {
  const date = new Date(dateMs);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const NoteView = ({ note }: Props) => {
  return (
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
            pre: {
              component(props: { children: { props: { children: string } } }) {
                return <Pre>{props.children.props.children}</Pre>;
              },
            },
          },
        }}
      >
        {note.body}
      </Markdown>
    </article>
  );
};
