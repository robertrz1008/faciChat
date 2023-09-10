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

export const getMessagesbyUser = async (req: CustomRequest, res: Response) => {
    try {
        const response = await connectdb.query(`SELECT * FROM messages WHERE user_id = ?`, [req.user.id])
        res.json(response[0])
    } catch (error) {
        console.log(error)
    }
    
}

export const createMessage = async (req: CustomRequest, res: Response) => {
    const {containe} = req.body
    try {
        await connectdb.query(`INSERT INTO messages(containe, user_id) VALUES( ?, ?);`, [containe, req.user.id])
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
