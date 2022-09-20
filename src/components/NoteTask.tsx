import React from "react";
import { INote } from "../Interfaces";
import Table from "react-bootstrap/Table";
import { BiArchiveIn } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { BsChatQuoteFill } from "react-icons/bs";
import { FaRegSun } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";


interface Props {
  note: INote;
  deleteTask(noteId: number): void;
  archiveNote(noteId: number): void;
  editNote(noteId: number): void;
  editForm(noteId: number): void;
}

const getCategoryIcon = (category: string) => {
  if (category === "Task") {
    return <FaShoppingCart />
  } else if (category === "Idea") {
    return <HiOutlineLightBulb />
  } else if (category === "Quote") {
    return <BsChatQuoteFill />
  } else {
    return <FaRegSun />
  }
}

const dateRegex = /\d{2}(\D)\d{2}\1\d{4}/g;

const NoteTask = ({ note, deleteTask, archiveNote, editForm }: Props) => {
  const categoryIcon = getCategoryIcon(note.category);
  let date = new Date(note.date).toLocaleDateString();
  let res: string[] | null = note.description.match(dateRegex);
  let formattedDate = !res
    ? ""
    : res.length === 1
      ? res
      : res[res.length - 2] + " : " + res[res.length - 1];
  return (
    <Table className = "note">
      <tbody>
        <tr className = "details">
          <td>{categoryIcon}</td>
          <td className = "title">{note.title}</td>
          <td className = "date"> {date}  </td>
          <td className = "categories"> {note.category}</td>
          <td className = "content">{note.description}</td>
          <td className = "dates" > {formattedDate}</td>
          <td onClick = {() => {
            editForm(note.id)
          }} className = "edit"><BsFillPencilFill /></td>
          <td onClick = {() => {
            archiveNote(note.id)
          }} className="archived"><BiArchiveIn /></td>
          <td onClick = {() => {
            deleteTask(note.id)
          }} className = "delete"><AiFillDelete /></td>
        </tr>
      </tbody>
    </Table>
  )
};

export default NoteTask;
