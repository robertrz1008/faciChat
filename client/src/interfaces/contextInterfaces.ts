import { ReactNode } from "react";

export interface contexArg {
    children: ReactNode
}
export interface User {
    name?: string,
    email: string,
    password: string
}
export interface Chat{
    user_name: string,
    chat_id: number,
    latest_message_content: string,
    latest_message_time: string
}

//context interface
export interface AppContextIn{
    singUp: (user: User) => void,
    singIn: (user: User) => void,
    getProfile: () => void,
    user: User,
    loading: boolean,
    isAutenticate: boolean,
    errors: String[]
}

export interface ChatContextIn{
    chats: Chat[],
    getChats: () => void
}

export interface FormValues{
    name: string,
    email: string,
    password: string
}

