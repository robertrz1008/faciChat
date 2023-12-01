import {dirname} from "path"
import {fileURLToPath} from "url"

export const PORT = process.env.NODE_ENV === 'production' ? 80 : 5000;
export const TOKEN_SECREAT = "tokenrr32tty10";
export const socketMsg = {
    post: "createMsg",
    delete: "deleteMsg",
    put: "updateMsg",
} 