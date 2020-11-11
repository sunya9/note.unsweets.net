import Markdown from "markdown-to-jsx";
import { Note } from "../@types/note";
import { NextLinkIfInternalAnchor } from "../components/NextLinkIfInternalAnchor";
import { Pre } from "../components/Pre";
import { formatDate, formatTime } from "../util/formatDateTime";

interface Props {
  note: Note;
}

const formatDateTime = (dateMs: number) => {
  return `${formatDate(dateMs)} ${formatTime(dateMs)}`;
};

export const NoteView = ({ note }: Props) => {
  return (
    <article>
      <h1>{note.title}</h1>
      <p>
        published: <time>{formatDateTime(note.createdAt)}</time>{" "}
        {note.createdAt !== note.createdAt && (
          <>
            updated: <time>{formatDateTime(note.updatedAt)}</time>
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
              component(props: {
                children: { props: { className?: string; children: string } };
              }) {
                return <Pre {...props.children.props} />;
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
