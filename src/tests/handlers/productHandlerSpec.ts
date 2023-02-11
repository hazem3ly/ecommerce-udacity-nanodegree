import supertest from "supertest";
import { Product } from "../../models/product";
import app from "../../server";
import jwt from 'jsonwebtoken';

const request = supertest(app);

const dummyProduct: Product = {
    id: 1,
    name: "Product AA",
    price: 1000,
    category: 'Cat A'
};

let token = '';

beforeAll(async () => {
    token = jwt.sign({
        id: 1,
        first_name: 'first_name',
        last_name: 'last_name',
        password: '123',
    }, process.env.TOKEN_SECRET as string)
});

describe("products apis", () => {
    it("get all products when call /products", async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
    });

    it("add new product", async () => {
        const response = await request
            .post("/products")
            .send(dummyProduct)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(dummyProduct);
        dummyProduct.id = response.body.id
    });

    it("get added product", async () => {
        const response = await request.get(`/products/${dummyProduct.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(dummyProduct);
    });

    it("delete added product", async () => {
        const response = await request
            .delete(`/products/${dummyProduct.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it("token required error response", async () => {
        const response = await request.post("/products").send(dummyProduct);
        expect(response.status).toBe(401);
    });
});