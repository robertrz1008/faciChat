import pg from "pg"

const connectdb = new pg.Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1331",
    database: "appchatdb",
})

export default connectdb