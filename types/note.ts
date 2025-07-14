export type Tag = 'Todo' |'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Ideas' | 'Travel' | 'Finance' | 'Health' | 'Important'

export interface Note {
    id: string,
    title: string,
    content: string,
    tag: Tag,
    createdAt: string,
    updatedAt: string,
}

export interface NewNote {
    title: string,
    content: string,
    tag: Tag,
}