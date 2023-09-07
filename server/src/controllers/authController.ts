import { Request, Response } from "express";
import connectdb from "../utils/connectiondb";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../lib/jwt";
import { User } from "../utils/Interfaces";

export const getUsersRequest = async (req: Request, res: Response):Promise< Response| void> => {
    try {
        const response = await connectdb.query("SELECT * FROM users WHERE id = ?", [req.params.id])

        if(!response[0]) return res.status(404).json({mesaje: "user not found"})

        if(Array.isArray(response[0])){
            const user: User | any = response[0][0]
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        }
       
    } catch (error) {
        console.log(error)
    }
}


export const registerRequest = async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    const passwordCrypt = await bcrypt.hash(password, 3)

    try {
        await connectdb.query(`INSERT INTO users(name, email, password) VALUES( ?, ?, ?);`,[name, email, passwordCrypt])

        const response = await connectdb.query("SELECT * FROM users WHERE email = ?", [email])

        if(Array.isArray(response[0])){
            const userFound: User | any = response[0][0]
            const token = await createAccessToken({ id: userFound.id })

            res.cookie("token", token)

            res.json({
                id: userFound.id,
                name: userFound.name,
                email: userFound.email, 
                password: userFound.password
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "email in use"})
    }
}

export const loginRrquest = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const response = await connectdb.query("SELECT * FROM users WHERE email = ?", [email])

        if(!response) return res.status(404).json(["no se reconoce el email"])
       
        if(Array.isArray(response[0])){
            const userFound: User | any = response[0][0]
            const isMatch = await bcrypt.compare(password, userFound.password)

            if(!isMatch) return res.json(["password incorrect"])

            const token = await createAccessToken({id: userFound.id})
            res.cookie("token", token)
            res.send(`Bienvenido ${userFound.name}`)
        }
    } catch (error) {
        console.log(error)
    }
}
