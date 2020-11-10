import Link from "next/link";
import { Note } from "../@types/note";
import { formatDate } from "../util/formatDateTime";

interface Props {
  notes: Note[];
}
export const NoteList = (props: Props) => {
  return (
    <ul>
      {props.notes.map((note) => (
        <li key={note.slug}>
          {formatDate(note.createdAt)}{" "}
          <Link href={`/notes/${note.slug}`}>{note.title}</Link>
        </li>
      ))}
    </ul>
  );
};
