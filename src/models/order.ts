import client from "../database";

export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

export class Orders {
    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql = "SELECT * FROM orders";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Error Loading orders. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql =
                "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
            const result = await connection.query(sql, [order.user_id, order.status]);
            const newOrder = result.rows[0] as Order;
            connection.release();
            return newOrder;
        } catch (err) {
            throw new Error(`Could not add new order ${order.user_id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const connection = await client.connect();
            const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
            const result = await connection.query(sql, [id]);
            const order = result.rows[0];
            connection.release();
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }

    async addProduct(
        order_id: number,
        product_id: number,
        quantity: number
    ): Promise<{
        id: number;
        quantity: number;
        order_id: number;
        product_id: number;
    }> {
        try {
            const connection = await client.connect();
            const sql =
                "INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
            const result = await connection.query(sql, [order_id, product_id, quantity]);
            const order = result.rows[0];
            connection.release();
            console.log(order);
            return order;
        } catch (err) {
            console.log(err);
            throw new Error(
                `Could not add new product ${product_id} to order ${order_id}. Error: ${err}`
            );
        }
    }


    async userOrder(user_id: string): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql =
                "SELECT * FROM orders JOIN order_product ON orders.id=order_product.order_id JOIN products ON products.id=order_product.product_id WHERE user_id=$1";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to get active order of user ${user_id}: ${err}`);
        }
    }

}