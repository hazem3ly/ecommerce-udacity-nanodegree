import supertest from "supertest";
import app from "../../server";
import jwt from 'jsonwebtoken';
import { User } from "../../models/user";
import { Order } from "../../models/order";


const request = supertest(app);

const dummyUser: User = {
    id: 1,
    first_name: 'first_name',
    last_name: 'last_name',
    password: '123',
};

const dummyOrder: Order = {
    id: 1,
    user_id: 1,
    status: 'completed'
}

let token = '';

beforeAll(async () => {
    token = jwt.sign({ dummyUser }, process.env.TOKEN_SECRET as string)
});

describe("orders apis", () => {
    it("get all orders when call /orders", async () => {
        const response = await request.get("/orders")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});