import client from "../database"
import bcrypt from "bcrypt"

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD as string;

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
            if (!saltRounds) throw new Error(`Salt Not Founded`)
            const hash = bcrypt.hashSync(b.password + pepper, parseInt(saltRounds))
            const result = await conn.query(sql, [b.first_name, b.last_name, hash])
            const newUser = result.rows[0]
            conn.release()
            return newUser
        } catch (err) {
            throw new Error(`Could not add new User ${b.first_name}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
            const result = await connection.query(sql, [id]);
            const order = result.rows[0];
            connection.release();
            return order;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(
        firstname: string,
        lastname: string,
        password: string
    ): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE first_name=($1) AND last_name=($2)";
            const result = await conn.query(sql, [firstname, lastname]);
            if (!saltRounds) throw new Error(`Salt Not Founded`)
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password + pepper, user.password)) {
                    conn.release();
                    return user;
                }
            }
            conn.release();
            return null;
        } catch (err) {
            throw new Error(
                `Could not authenticate user ${firstname} ${lastname}. Error: ${err}`
            );
        }
    }



}