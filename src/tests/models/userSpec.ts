import { User, Users } from "../../models/user";

const users = new Users();

const dummyUser: User = {
    id: 1,
    first_name: 'first_name',
    last_name: 'last_name',
    password: '',
}

describe("Check Users Model", () => {

    it("should have index method", () => {
        expect(users.index).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await users.create(dummyUser);
        dummyUser.id = result.id;
        dummyUser.password = result.password
        expect(result).toEqual(dummyUser);
    });

    it('index method should return a list of users', async () => {
        const result = await users.index();
        expect(result).toContain(dummyUser);
    });

    it('show method should return the correct user', async () => {
        const result = await users.show(`${dummyUser.id}`);
        expect(result.id).toEqual(dummyUser.id);
    });

});