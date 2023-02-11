import { Order, Orders } from "../../models/order";
import { User, Users } from "../../models/user";

const users = new Users();
const dummyUser: User = {
    id: 1,
    first_name: 'first_name',
    last_name: 'last_name',
    password: '',
}

const orders = new Orders();

const dummyOrder: Order = {
    id: 1,
    user_id: 1,
    status: 'completed',
}

describe("Check orders Model", () => {

    it("should have index method", async () => {
        expect(orders.index).toBeDefined();
    });

    it("should have create method", async () => {
        expect(orders.create).toBeDefined();
    });

    it("should have create show", async () => {
        expect(orders.show).toBeDefined();
    });

    it("should have create delete", async () => {
        expect(orders.delete).toBeDefined();
    });

});