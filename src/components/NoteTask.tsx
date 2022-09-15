import React from "react";
import { INote } from "../Interfaces";
import Table from 'react-bootstrap/Table';
import {BiArchiveIn} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';
import {BsFillPencilFill} from 'react-icons/bs';
import {FaShoppingCart} from 'react-icons/fa';
import {BsChatQuoteFill} from 'react-icons/bs';
import {FaRegSun} from 'react-icons/fa';
import {HiOutlineLightBulb} from 'react-icons/hi';


interface Props{
    note: INote;
    deleteTask(noteId:number): void;
    archiveNote(noteId:number): void;
    editNote(noteId:number):void;
}

const getCategoryIcon = (category: string) => {

    if(category=== 'Task'){
      return <FaShoppingCart/>
    }else if(category==="Idea" ){
      return <HiOutlineLightBulb/>
    }else if(category=== 'Qute'){
      return  <BsChatQuoteFill/>
    }else{
      return <FaRegSun/>
    }
  }


const NoteTask = ({note, deleteTask, archiveNote,editNote} : Props) => {

    const categoryIcon = getCategoryIcon(note.category);
    let date =  note.dates[note.dates.length - 1];
      let dates = note.dates.length > 1 
      ? note.dates[note.dates.length - 1] + ' : ' + note.dates[note.dates.length - 2]
      : '';
    return (
        <Table className="note">
           <tbody>
           <tr className="details">
            <td>{categoryIcon}</td>
                
                <td className ="title">{note.title}</td>
                <td className ="date"> {date}  </td>
                <td className ="categories"> {note.category}</td>
                <td className="content">{note.description}</td>
                <td className="dates"> {dates}</td>
                <td onClick={() =>{
                    editNote(note.id)
                }} className="edit"><BsFillPencilFill/></td>
                <td onClick={() =>{
                    archiveNote(note.id)
                }} className="archived"><BiArchiveIn/></td>
                <td onClick={() => {
                    deleteTask(note.id)
                }} className="delete"><AiFillDelete/></td>
        </tr> 
        </tbody>                      
      </Table>
    )
};

export default NoteTask;


