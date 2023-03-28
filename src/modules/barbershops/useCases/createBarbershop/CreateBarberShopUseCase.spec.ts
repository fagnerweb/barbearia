import { UserRepositoryInMemory } from "../../../accounts/repositories/in-memory/UserRepositoryInMemory";
import { BarbeShopRepositoryInMemory } from "../../repositories/in-memory/BarberShopRepositoryInMemory";
import { CreateBarberShopUseCase } from "./CreateBarberShopUseCase";

let barbershopRepositoryInMemory: BarbeShopRepositoryInMemory;
let createBarberShopUseCase: CreateBarberShopUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create Barbershop", () => {
    beforeEach(() => {
        barbershopRepositoryInMemory = new BarbeShopRepositoryInMemory();
        userRepositoryInMemory = new UserRepositoryInMemory();

        createBarberShopUseCase = new CreateBarberShopUseCase(
            barbershopRepositoryInMemory,
            userRepositoryInMemory
        );
    });

    it("should be able to create a new BarberShop", async () => {
        const user = await userRepositoryInMemory.create({
            name: "Fagner",
            email: "fagner@email.com",
            password: "12345678",
        });

        const barbershop = await createBarberShopUseCase.execute({
            name: "Barbearia do João",
            address: "Rua das Flores, 123",
            city: "São Paulo",
            state: "SP",
            zipCode: "01234-567",
            phone: "(11) 98765-4321",
            email: "contato@barbeariadojoao.com",
            user_id: user.id,
        });

        expect(barbershop).toHaveProperty("id");
    });
});
