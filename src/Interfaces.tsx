export interface IBaseNote {
    title: string;
    description: string;
    category: string;
}

export interface INote extends IBaseNote {
    id: number;
    isArchived: boolean;
    date: string;
}