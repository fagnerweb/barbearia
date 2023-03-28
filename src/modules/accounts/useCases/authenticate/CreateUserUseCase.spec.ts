import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AutenticateUserUseCase } from "./AutenticateUserUseCase";

let authenticateUseUseCase: AutenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: UserRepositoryInMemory;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepository = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepository);
        authenticateUseUseCase = new AutenticateUserUseCase(usersRepository);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Fagner",
            email: "fagner@email.com",
            password: "12345678",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUseUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an incorrect password", async () => {
        await expect(
            authenticateUseUseCase.execute({
                email: "false@email.com",
                password: "12345678",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate an incorrect password", async () => {
        const user: ICreateUserDTO = {
            name: "Fagner",
            email: "fagner@email.com",
            password: "12345678",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUseUseCase.execute({
                email: user.email,
                password: "87654321",
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
