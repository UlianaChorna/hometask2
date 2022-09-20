import { INote } from "../Interfaces";
const date: string = new Date().toString();

export const defaultNotes: INote[] = [
    {
        "id": 1,
        "title": "Task 1",
        "description": "Description 1",
        "category": "Task",
        "isArchived": false,
        "date": date
    },
    {
        "id": 2,
        "title": "Task 2",
        "description": "Description 2",
        "category": "Task",
        "isArchived": true,
        "date": date
    },
    {
        "id": 3,
        "title": "Random Thought 1",
        "description": "Description Random Thought 1",
        "category": "Random Thought",
        "isArchived": false,
        "date": date
    },
    {
        "id": 4,
        "isArchived": false,
        "title": "Random Thought 2",
        "description": "Description Random Thought 2",
        "category": "Random Thought",
        "date": date     
    },
    {
        "id": 5,
        "title": "Idea 1",
        "description": "Description Idea 1",
        "category": "Idea",
        "isArchived": false,
        "date": date
    },
    {
        "id": 6,
        "title": "Idea 2",
        "description": "Description Idea 2",
        "category": "Idea",
        "isArchived": false,
        "date": date
    },
    {
        "id": 7,
        "title": "Quote Task",
        "description": "Description Quote",
        "category": "Quote",
        "isArchived": false,
        "date": date
    }
]