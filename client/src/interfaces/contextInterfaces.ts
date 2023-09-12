import { ReactNode } from "react";

export interface contexArg {
    children: ReactNode
}
export interface User {
    name: string,
    email: string,
    password?: string
}
export interface appContextIn{
    singUp: (user: User) => void,
    users: User
}

export interface FormValues{
    name: string,
    email: string,
    password: string
}
