import { Request, Response } from "express";
import connectdb from "../utils/connectiondb";
import fs from "fs"
import path from "path"
import { CustomRequest } from "../utils/Interfaces";

type Image ={
    id: number,
    name: string, 
    data: string
}

export const updateName = async (req: Request, res: Response) => {
    const {name} = req.body
    try {
        await connectdb.query("UPDATE users SET name = ? WHERE id = ?", [name, req.params.id])
        res.json({msg: "nombre modificado"})
    } catch (error) {
        console.log(error)
    }
}

//images
export const getImagesProfilebyId = async (req: Request, res: Response) => {
    try {
        const response = await connectdb.query('SELECT * FROM images WHERE id = ?', [req.params.id])
        const file: Image[] | any = response[0]

        fs.writeFileSync(path.join(__dirname, '../dbImages/' + file.id + "-facichat.png"), file.data)
        const image = fs.readdirSync(path.join(__dirname, '../dbImages/'))
        res.json(image)
    } catch (error) {
        console.log(error)
    }
}

export const createImageProfile = async (req: Request, res: Response) => {
    const type = req.file?.mimetype
    const name = req.file?.originalname
    const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file?.filename))
    try {
        //subimos la img a la db
        await connectdb.query('INSERT INTO images(type, name, data)  VALUES(?, ?, ?)', [type, name, data])
        //seleccionamos todas las img de la tabla
        const myImages: any = await connectdb.query('SELECT * FROM images ORDER BY id DESC LIMIT 1')
        res.json(myImages[0].id) 
    } catch (error) {
        console.log(error)
    }
}

export const changeUserImageProfile = async (req: Request, res: Response) => {
    const {userId} = req.body
    const imgId = req.params.id
    try {
        await connectdb.query("UPDATE users SET id_message = ? WHERE id = ?", [imgId, userId])
        res.send("mensaje modificado")
    } catch (error) {
        console.log(error)
    }
}

export const deleteImageProdile = async (req: Request, res: Response) => {
    try {
        await connectdb.query("DELETE FROM image WHERE id = ?", [req.params.id])
    } catch (error) {
        console.log(error)
    }
}

