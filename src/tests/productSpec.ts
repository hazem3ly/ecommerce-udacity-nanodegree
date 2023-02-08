import { Products } from "../models/product";

const products = new Products();

describe("Check Products Model", () => {
    it("should have index method", () => {
        expect(products.index).toBeDefined();
    });

    it("index method should return list of products", async () => {
        const result = await products.index()
        expect(result).toEqual([]);
    });

    // it('create method should add a book', async () => {
    //     const result = await store.create({
    //         title: 'Bridge to Terabithia',
    //         totalPages: 250,
    //         author: 'Katherine Paterson',
    //         summary: 'Childrens'
    //     });
    //     expect(result).toEqual({
    //         id: "1",
    //         title: 'Bridge to Terabithia',
    //         totalPages: 250,
    //         author: 'Katherine Paterson',
    //         summary: 'Childrens'
    //     });
    // });

    // it('index method should return a list of books', async () => {
    //     const result = await store.index();
    //     expect(result).toEqual([{
    //         id: "1",
    //         title: 'Bridge to Terabithia',
    //         totalPages: 250,
    //         author: 'Katherine Paterson',
    //         summary: 'Childrens'
    //     }]);
    // });

    // it('show method should return the correct book', async () => {
    //     const result = await store.show("1");
    //     expect(result).toEqual({
    //         id: "1",
    //         title: 'Bridge to Terabithia',
    //         totalPages: 250,
    //         author: 'Katherine Paterson',
    //         summary: 'Childrens'
    //     });
    // });

    // it('delete method should remove the book', async () => {
    //     store.delete("1");
    //     const result = await store.index()

    //     expect(result).toEqual([]);
    // });
});