export enum userRole {
    admin='ADMIN',
    user='USER',
    unknown='anonymos'
}

export interface User {
    _id: string;
    email: string;
}
  
export interface EventMessage {
    event: string;
    user: User;
}

export interface SingleMessage {
    topic: string;
    value: string;
}


export interface multipleMessage {
    value: string | Buffer;
    key?: string | Buffer;
    partition?: number;
}