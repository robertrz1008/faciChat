import { Response } from "express";
import { CustomRequest } from "../utils/Interfaces";
import connectdb from "../utils/connectiondb";

export const getChatsPrivateRequest = async (req: CustomRequest, res: Response) => {
    
    type chatUser = {
        id: Number,
        id_user: Number,
        id_chat: Number
    }
    function chatList(arr1: chatUser[], arr2: chatUser[] ) {
        const newX = arr1.reduce((cc, el) => cc.concat(el.id_chat), [] as Number[])
        const mY = arr2.filter(data => newX.indexOf(data.id_chat) != -1)
        return mY
    }

    try {
        const mychat = await connectdb.query(`SELECT * FROM users_chat WHERE id_user = ?`, [req.user.id])
        const userchat = await connectdb.query(`SELECT * FROM users_chat WHERE id_user <> ?`, [req.user.id])
        if (Array.isArray(mychat[0]) && Array.isArray(userchat[0])) {
            const mc: chatUser[] | any = mychat[0]
            const uc: chatUser[] | any = userchat[0]
            const myChatsList = chatList(mc, uc)
            
            res.json(myChatsList)
        }
    } catch (error) {
        console.log(error)
    }
}

export const createChatPrivateRequest = async (req: CustomRequest, res: Response) => {
    const n = 1
    const yo  = req.user.id
    const {userId} = req.body
    try {
        //cramos el chat para crear la sala de combersacion 
        await connectdb.query(`INSERT INTO chats(id_type) VALUES(?);`, [n])
        const response = await connectdb.query(`SELECT * FROM chats`)

        if (Array.isArray(response[0])) {
            const chatFound: any = response[0][response[0].length -1]
            //para definir quienes seran los integrantes de la combersacion
            connectdb.query(`INSERT INTO users_chat(id_user, id_chat) VALUES(?, ?);`, [yo ,chatFound.id])
            connectdb.query(`INSERT INTO users_chat(id_user, id_chat) VALUES(?, ?);`, [userId ,chatFound.id])
            
            res.json({message: "chat privado creado con exito"})
        }
    } catch (error) {
        console.log(error)
    }
}