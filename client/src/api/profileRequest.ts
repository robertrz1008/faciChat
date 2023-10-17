import { Image } from '../interfaces/contextInterfaces.ts'
import axios from './axios.ts'

export const createImagesRequest = (img: FormData) => axios.post("/profile/image", img)

export const getImageByIdRequest = (id: number) => axios.get(`/profile/image/${id}`)

export const changeImagesRequest = (id: number, userId: number) => axios.put(`/profile/image/${id}`, userId)

export const deleteImageRequest = (id: number) => axios.put(`/profile/image/${id}`)