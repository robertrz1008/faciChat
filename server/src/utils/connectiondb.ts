import mysql from "mysql2/promise"

const connectdb = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3300,
    password: "1234567890",
    database: "appChatdb",
})

export default connectdb