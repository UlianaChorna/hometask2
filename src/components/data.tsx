import { INote } from '../Interfaces';
const dates: string[] = [new Date().toLocaleDateString()];

export const defaultNotes: INote[] = [
    {
        "id": 1,
        "title": "Task 1",
        "description": "Description 1",
        "category": "Task",
        "isArchived": false,
        "dates": dates
    },
    {
        "id": 2,
        "title": "Task 2",
        "description": "Description 2",
        "category": "Task",
        "isArchived": true,
        "dates": dates
    },
    {
        "id": 3,
        "title": "Random Thought 1",
        "description": "Description Random Thought 1",
        "category": "Random Thought",
        "isArchived": false,
        "dates": dates
    },
    {
        "id": 4,
        "isArchived": false,
        "title": "Updated Random Thought 2",
        "description": "Description Random Thought 2",
        "category": "Random Thought",
        "dates": dates
       
       
    },
    {
        "id": 5,
        "title": "Idea 1",
        "description": "Description Idea 1",
        "category": "Idea",
        "isArchived": false,
        "dates": dates
    },
    {
        "id": 6,
        "title": "Idea 2",
        "description": "Description Idea 2",
        "category": "Idea",
        "isArchived": false,
        "dates": dates
    },
    {
        "id": 7,
        "title": "Quote Task",
        "description": "Description Quote",
        "category": "Quote",
        "isArchived": false,
        "dates": dates
    },
    {
        "id": 50,
        "isArchived": false,
        "dates":dates,
        "title": "New Idea",
        "description": "new Test Idea",
        "category": "Idea"
    }
]