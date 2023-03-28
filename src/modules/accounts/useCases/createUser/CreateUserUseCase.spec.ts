import { AppError } from "../../../../errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;

describe("Create User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to create a new user", async () => {
        const user = await createUserUseCase.execute({
            name: "Fagner",
            email: "fagner@email.com",
            password: "87654321",
        });

        expect(user).toHaveProperty("id");
    });

    it("should not be able to create a user with same email", async () => {
        await createUserUseCase.execute({
            name: "Fagner",
            email: "test@test.com",
            password: "12345678",
        });

        expect(async () => {
            await createUserUseCase.execute({
                name: "Fagner 2",
                email: "test@test.com",
                password: "12345678",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a user with password less then 8 characters", async () => {
        expect(async () => {
            await createUserUseCase.execute({
                name: "Fagner",
                email: "fagner@email.com",
                password: "1234567",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
