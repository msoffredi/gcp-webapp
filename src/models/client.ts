export interface NewClient {
    name: string;
}

export interface ClientRecord extends NewClient {
    _id: string;
    createdAt: string;
    updatedAt: string;
}
