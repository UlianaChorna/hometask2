import React from "react";
import { INote } from '../Interfaces'
import Table from 'react-bootstrap/Table';
interface Props {
    category: string;
    noteList: INote[];
}

const showCategories = ({ category, noteList }: Props) => {

    let categoryNotes = noteList.filter(note => note.category === category);
    let active = categoryNotes.filter(note => !note.isArchived).length;
    let archived = categoryNotes.filter(note => note.isArchived).length;
    return (
        <Table className="note">
            <tbody>
                <tr className="details">
                    <td className="note_categoty">{category}</td>
                    <td className="active">{active}</td>
                    <td className="archived"> {archived}</td>

                </tr>
            </tbody>

        </Table>

    )

}
export default showCategories;