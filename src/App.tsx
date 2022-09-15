import React, { FC, ChangeEvent, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { AiFillDelete } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { INote } from './Interfaces';
import NoteTask from "./components/NoteTask";
import ArchivedNotes from "./components/ArchivedNotes";
import DatePicker from "react-datepicker";
import {defaultNotes} from './components/data';

import "react-datepicker/dist/react-datepicker.css";
import './App.css';


const App: FC = () => {

  const [title, setTitle] = useState<string>('');
  const [noteList, setNoteList] = useState<INote[]>([...defaultNotes]);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>(" ");
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());

  const categories = ["Task", "Random Thought", "Idea", "Quote"];

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    } else {
      setDescription(event.target.value)
    }
  };
 
  const editNote = (id: number):void=>{
    let index:number = noteList.findIndex(note => note.id === id);
      console.log(index);
      let dates: string[] = noteList[index].dates;
    if (date) {
      if (dates[dates.length - 1] !== date.toLocaleDateString()) {
        dates.push(date.toLocaleDateString());
      }
    }

    noteList[index] = {
      id,
      isArchived: noteList[index].isArchived,
      dates,
      title: title,
      description: description,
      category: category,
    };
    setNoteList([...noteList]);
    // handleShow()
  }

  const addTask = (): void => {
    let date = new Date().toLocaleDateString();
    let dates = [date];
    let id = Math.floor(Math.random() * 10);
    
    const newNote = { id: id, title: title, description: description, category: category, dates: dates, isArchived: false }
    setNoteList([...noteList, newNote]);
    setTitle('');
    setDescription('');
    console.log([id, title, description, date])

  };


  const archiveNote = (NoteToArchive: number): void => {
    console.log(NoteToArchive)
    let noteToUpdate = noteList.find(n => n.id === NoteToArchive);
    console.log(noteToUpdate);
    if (noteToUpdate) {
      noteToUpdate.isArchived = !noteToUpdate.isArchived;
    }

    console.log(noteToUpdate);
    setNoteList([...noteList]);
    // handleShow()
    console.log(noteList);
  }


  const deleteTask = (noteId: number): void => {
    setNoteList(noteList.filter((note) => {
      return (note.id !== noteId)
    }))
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Table>
        <tbody className="table-title">
          <tr>
            <td>Name</td>
            <td>Created</td>
            <td>Category</td>
            <td>Content</td>
            <td>Dates</td>
            <td><BiArchiveIn /></td>
            <td><AiFillDelete /></td>
          </tr>
        </tbody>
      </Table>
      <div className='notelist'>
        {noteList.filter(note => !note.isArchived).map((note: INote, key: number) => {
          return (
            <NoteTask
              key={key}
              note={note}
              deleteTask={deleteTask}
              archiveNote={archiveNote} 
              editNote={editNote}/>
          )
        })}
      </div>
      <div id="notesWrapper">
        <div className="add-box">
          <button data-form className="btn btn_white "
            onClick={handleShow} >
            New Note
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="form-content">

        <Modal.Body>
          <Form >
            <Form.Group className='' controlId="exampleForm.ControlInput1">
              <Form.Label className='form__title'>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={title}
                name='title'
                className=' title_add'
                placeholder='Add a task'
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form__title">Description</Form.Label>
              <Form.Control
                type="text"
                name='description'
                onChange={handleChange}
                value={description}
                className=' description'
                placeholder='Description'
                required />
            </Form.Group>
          </Form>
          <Form.Group
            controlId="formBasicSelect">
            <Form.Control
              as="select"
              value={category}
              onChange={e => {
                setCategory(e.target.value);
              }}
              className='
              category'>
              <option value="Task" >Task</option>
              <option value="Idea" >Idea</option>
              <option value="Quote" >Quote</option>
              <option value="Random Thought" >Random Thought</option>
            </Form.Control>
          </Form.Group>
          <DatePicker selected={date} onChange={(date: Date) => setDate(date)} className="date_picker" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addTask} className='btn_submit' >
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose} className='btn_submit' >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Table className="table_category">
        <tbody className="table-title">
          <tr>
            <td>Note Category</td>
            <td>Active</td>
            <td>Archived</td>
          </tr>
        </tbody>
      </Table><div className='notelist'>
        {categories.filter(category => {
          let categoryNotes = noteList.filter(note => note.category === category);
          return categoryNotes.length > 1;
        }).map((category: string, key: number) => {
          return (
            <ArchivedNotes
              category={category}
              noteList={noteList} />
          )
        })}
      </div>

    </div>

  );
}

export default App;
