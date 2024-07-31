export interface NewUser {
    name: string;
    email: string;
}

export interface UserRecord extends NewUser {
    _id: string;
    createdAt: string;
    updatedAt: string;
}
