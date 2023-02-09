import client from "../database"

export type User = {
    id?: Number,
    first_name: string,
    last_name: string,
    password: string,
}


export class Users {

    async index(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Error Loading users ${error}`)
        }
    }


    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find User ${id}. Error: ${err}`)
        }
    }

    async create(b: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()

            const result = await conn.query(sql, [b.first_name, b.last_name, b.password])

            const User = result.rows[0]

            conn.release()

            return User
        } catch (err) {
            throw new Error(`Could not add new User ${b.first_name}. Error: ${err}`)
        }
    }




}