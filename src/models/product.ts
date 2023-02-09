import client from "../database"

export type Product = {
    id?: number | undefined,
    name: string,
    price: number,
    category: string,
}

export class Products {

    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Error Loading Products ${error}`)
        }
    }


    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()

            const result = await conn.query(sql, [product.name, product.price, product.category])

            const newProduct = result.rows[0]

            conn.release()

            return newProduct
        } catch (err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const book = result.rows[0]

            conn.release()

            return book
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }


    // - Index
    // - Show
    // - Create [token required]
    // - [OPTIONAL] Top 5 most popular products
    // - [OPTIONAL] Products by category (args: product category)
}