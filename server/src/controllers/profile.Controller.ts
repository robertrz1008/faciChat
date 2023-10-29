import { Request, Response } from "express";
import connectdb from "../utils/connectiondb";
import fs from "fs"
import path from "path"
import { CustomRequest } from "../utils/Interfaces";
import { getElementByNumber } from "../utils/seachFile";

type Image ={
    id: number,
    name: string, 
    data: string
}

export const updateNameProfile = async (req: Request, res: Response) => { 
    const {name} = req.body
    try {
        await connectdb.query("update users set name = ? where id = ?", [name, req.params.id])
        res.json({msg: "nombre modificado"})
    } catch (error) {
        console.log(error)
    }
}

//images
export const getImagesProfilebyId = async (req: Request, res: Response) => {
    try {
        const response = await connectdb.query('SELECT * FROM images WHERE id = ?', [req.params.id])
        if(Array.isArray(response[0]) && response[0].length == 0) res.status(404).json({msg: "no hay archivos"})
        const file: Image[] | any = response[0]

        fs.writeFileSync(path.join(__dirname, '../dbImages/' + file[0].id + "-facichat.png"), file[0].data)
        const images = fs.readdirSync(path.join(__dirname, '../dbImages/'))
        let fileFound = getElementByNumber(images, parseInt(req.params.id))
        res.json(fileFound)
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
        //seleccionamos la ultima img de la tabla
        const myImages = await connectdb.query('SELECT * FROM images ORDER BY id DESC LIMIT 1')
        
        if(Array.isArray(myImages[0]))  res.json(myImages[0][0]) 
    } catch (error) {
        console.log(error)
    }
}

export const changeUserImageProfile = async (req: CustomRequest, res: Response) => {
    const imgId = req.params.id
    const {id} = req.body
    try {
        await connectdb.query("update users set id_image = ? where id = ?", [imgId, id])
        res.send("mensaje modificado")
    } catch (error) {
        console.log(error)
    }
}

export const deleteImageProdile = async (req: Request, res: Response) => {
    try {
        await connectdb.query("DELETE FROM images WHERE id = ?", [req.params.id])
        res.send("mensaje eliminado")
    } catch (error) {
        console.log(error)
    }
}

