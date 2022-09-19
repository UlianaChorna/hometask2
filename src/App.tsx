import React, { FC, ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { INote, IBaseNote } from "./Interfaces";
import NoteTask from "./components/NoteTask";
import ArchivedNotes from "./components/ArchivedNotes";
import { defaultNotes } from "./components/data";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./App.css";


const App: FC = () => {
  const [noteList, setNoteList] = useState<INote[]>([...defaultNotes]);
  const [baseNote, setBaseNote] = useState<IBaseNote>({
    title: '',
    description: '',
    category: ''
  });
  const [show, setShow] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<number | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false)

  const categories = ["Task", "Random Thought", "Idea", "Quote"];

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "title") {
      setBaseNote((previous) => ({...previous, title: event.target.value}));
    } else {
      setBaseNote((previous) => ({...previous, description: event.target.value}));
    }
  };

  const editNote = (id: number): void => {
    let index: number = noteList.findIndex(note => note.id === id);
    noteList[index] = {
      id,
      isArchived: noteList[index].isArchived,
      date: noteList[index].date,
      ...baseNote
    };
  }

  const submitForm = () => {
    if (noteId) {
      editNote(noteId)
    } else {
      addTask();
    }
    setBaseNote((previous) => ({...previous, title: "", description: ""}));
    setNoteId(null);
    handleClose();
  }

  const addTask = (): void => {
    let date = new Date().toString();
    let id = Math.floor(Math.random() * 100);
    const newNote = {
      id: id,
      date: date,
      isArchived: false,
      ...baseNote
    }
    setNoteList([...noteList, newNote]);
  };

  const editForm = (NoteId: number): void => {
    let note = noteList.find(note => note.id === NoteId)
    if (note) {
      setNoteId(NoteId);
      setShow(true);
      setBaseNote({
        title: note.title,
        description: note.description,
        category: note.category
      });
    }
  }

  const archiveNote = (NoteToArchive: number): void => {
    let noteToUpdate = noteList.find(n => n.id === NoteToArchive);
    if (noteToUpdate) {
      noteToUpdate.isArchived = !noteToUpdate.isArchived;
    }
    setNoteList([...noteList]);
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
      <ButtonGroup className="mb-2">
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="secondary"
          checked={showArchived}
          value="1"
          onChange={(e) => setShowArchived(e.currentTarget.checked)}>
          Archived
        </ToggleButton>
      </ButtonGroup>

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
      <div>
        {noteList
          .filter((note) => note.isArchived === showArchived)
          .map((note: INote, key: number) => {
            return (
              <NoteTask
                key={key}
                note={note}
                deleteTask={deleteTask}
                archiveNote={archiveNote}
                editNote={editNote}
                editForm={editForm} />
            )
          })}
      </div>
      <div id="notesWrapper">
        <div className="add-box">
          <button
            data-form
            className="btn btn_white "
            onClick={handleShow} >
            New Note
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        className="form-content">
        <Modal.Body>
          <Form >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className="form__title"> Title </Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={baseNote.title}
                name="title"
                className="title_add"
                placeholder="Add a task"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form__title"> Description </Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={handleChange}
                value={baseNote.description}
                className="description"
                placeholder="Description"
                required />
            </Form.Group>
          </Form>
          <Form.Group
            controlId="formBasicSelect">
            <Form.Control
              as="select"
              value={baseNote.category}
              onChange={e => {
                setBaseNote((previous) => ({...previous, category: e.target.value}));
              }}
              className="category">
              <option value="Task" >Task</option>
              <option value="Idea" >Idea</option>
              <option value="Quote" >Quote</option>
              <option value="Random Thought" >Random Thought</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>

          <Button
            variant="primary"
            onClick={submitForm}
            className="btn_submit" >
            {noteId ? "Update" : "Add"}
          </Button >

          <Button
            variant="secondary"
            onClick={handleClose}
            className="btn_submit" >
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
      </Table><div >
        {categories.filter(category => {
          let categoryNotes = noteList.filter(note => note.category === category);
          return categoryNotes.length > 1;
        })
          .map((category: string, key: number) => {
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
