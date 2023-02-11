import { Product, Products } from "../../models/product";

const products = new Products();

const dummyProduct: Product = {
    id: 1,
    name: 'product 1',
    price: 100,
    category: 'cat a',
}

describe("Check Products Model", () => {

    it("should have index method", () => {
        expect(products.index).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await products.create(dummyProduct);
        dummyProduct.id = result.id;
        expect(result).toEqual(dummyProduct);
    });

    it('index method should return a list of products', async () => {
        const result = await products.index();
        expect(result).toContain(dummyProduct);
    });

    it('show method should return the correct product', async () => {
        const result = await products.show(`${dummyProduct.id}`);
        expect(result).toEqual(dummyProduct);
    });

    it('delete method should remove the product', async () => {
        const result = await products.delete(`${dummyProduct.id}`);
        expect(result).toEqual(dummyProduct);
    });
});