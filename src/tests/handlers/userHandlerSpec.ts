import supertest from "supertest";
import app from "../../server";
import jwt from 'jsonwebtoken';
import { User } from "../../models/user";


const request = supertest(app);

const dummyUser: User = {
    id: 1,
    first_name: 'first_name',
    last_name: 'last_name',
    password: '123',
};

let token = '';

beforeAll(async () => {
    token = jwt.sign({ dummyUser }, process.env.TOKEN_SECRET as string)
});

describe("users apis", () => {
    it("get all user when call /users", async () => {
        const response = await request.get("/users")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it("add new user", async () => {
        const response = await request
            .post("/users")
            .send(dummyUser);
        expect(response.status).toBe(200);
    });

    it("get user when call /users", async () => {
        const response = await request.get(`/users/${dummyUser.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

});