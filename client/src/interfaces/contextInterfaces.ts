import { ReactNode } from "react";

export interface contexArg {
    children: ReactNode
}
export interface User {
    id?: number,
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
export interface Message{
    mensaje_id: number,
    message: string,
    fecha_creacion: string,
    usuario_id: number,
    nombre_usuario: string,
    chat_id: number
}
export interface createMsg{
    containe: string,
    id_user: number,
    id_chat: number,
}
export interface Image{
    id: number;
    type: string;
    name: string;
    data: string;
}

//context interface
export interface AppContextIn{
    singUp: (user: User) => void,
    singIn: (user: User) => void,
    getProfile: () => void,
    user: User,
    loading: boolean,
    isAutenticate: boolean,
    authLoading: boolean,
    errors: String[]
}

export interface ChatContextIn{
    chats: Chat[];
    chatId: number;
    getChats: () => void;
    createMessage: (message: createMsg) => void;
    getMessages: (id: number) => void;
    messages: Message[];
    getId: (id: number) => void;
}

export interface FormValues{
    name: string,
    email: string,
    password: string
}

