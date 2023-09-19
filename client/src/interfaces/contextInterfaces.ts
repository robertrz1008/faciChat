import { ReactNode } from "react";

export interface contexArg {
    children: ReactNode
}
export interface User {
    name?: string,
    email: string,
    password: string
}
export interface AppContextIn{
    singUp: (user: User) => void,
    singIn: (user: User) => void,
    users: User,
    loading: boolean,
    isAutenticate: boolean,
    errors: String[]
}

export interface FormValues{
    name: string,
    email: string,
    password: string
}

