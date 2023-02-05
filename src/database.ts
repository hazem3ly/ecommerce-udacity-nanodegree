import dotenv from 'dotenv'
import { Pool } from 'pg'


dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DP,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env


const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DP,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default client;