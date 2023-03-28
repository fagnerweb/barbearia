import { BarbeShopRepositoryInMemory } from "../../repositories/in-memory/BarberShopRepositoryInMemory";
import { CreateBarberShopUseCase } from "./CreateBarberShopUseCase";

let barbershopRepositoryInMemory: BarbeShopRepositoryInMemory;
let createBarberShopUseCase: CreateBarberShopUseCase;

describe("Create Barbershop", () => {
    beforeEach(() => {
        barbershopRepositoryInMemory = new BarbeShopRepositoryInMemory();
        createBarberShopUseCase = new CreateBarberShopUseCase(
            barbershopRepositoryInMemory
        );
    });

    it("should be able to create a new BarberShop", async () => {
        const barbershop = await createBarberShopUseCase.execute({
            name: "Barbearia do João",
            address: "Rua das Flores, 123",
            city: "São Paulo",
            state: "SP",
            zipCode: "01234-567",
            phone: "(11) 98765-4321",
            email: "contato@barbeariadojoao.com",
            user_id: "12345",
        });

        expect(barbershop).toHaveProperty("id");
    });
});
