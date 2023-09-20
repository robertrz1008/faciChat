import { Request, Response, json } from "express";
import connectdb from "../utils/connectiondb";
import { CustomRequest } from "../utils/Interfaces";

export const getMessagesbyAdmin = async (req: Request, res: Response) => {
    try {
        const response = await connectdb.query(`
                SELECT m.containe as "message", m.creation as "fecha y horario", u.name, u.email 
                FROM messages as m JOIN users as u
                ON m.user_id = u.id
        `)
        res.json(response[0])
    } catch (error) {
        console.log(error)
    }
    
}

export const getMessagesByChatId = async (req: CustomRequest, res: Response) => {
    try {
        const response = await connectdb.query(`
        SELECT u.name as "usuario", m.containe as "mensaje", m.creation as "hora y fecha de envio", t.name as "chat"
        from messages as m JOIN users as u
        on m.id_user = u.id 
        JOIN users_chat as uc 
        on u.id = uc.id_user
        join chats as c
        on uc.id_chat = c.id
        JOIN chat_type as t
        on c.id_type = t.id
        WHERE c.id = ? ORDER BY m.creation ASC
        `, [req.params.id])
        res.json(response[0])
    } catch (error) {
        console.log(error)
    }
    
}

export const createMessage = async (req: CustomRequest, res: Response) => {
    const {containe, chatId} = req.body
    try {
        const chatFound = await connectdb.query(`SELECT * FROM chats WHERE id = ?`, [chatId])

        if(Array.isArray(chatFound[0]) && chatFound[0].length <= 0){
            return res.status(404).json({message: "NO existe el chat"})
        }
        await connectdb.query(`INSERT INTO messages(containe, id_user, id_chat) VALUES( ?, ?, ?);`, [containe, req.user.id, chatId])
        res.json({message: "mensaje enviado"})
    } catch (error) {
        console.log(error)
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        await connectdb.query(`DELETE FROM messages WHERE id = ?`, [req.params.id])
        res.json({message: "mensage eliminado"})
    } catch (error) {
        console.log(error)
    }
}
