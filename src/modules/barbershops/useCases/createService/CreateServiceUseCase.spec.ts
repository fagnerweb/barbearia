import { AppError } from "../../../../errors/AppError";
import { ICreateServiceDTO } from "../../dtos/ICreateServiceDTO";
import { ServiceRepositoryInMemory } from "../../repositories/in-memory/ServiceRepositoryInMemory";
import { CreateServiceUseCase } from "./CreateServiceUseCase";

let createServiceUseCase: CreateServiceUseCase;
let serviceRepositoryInMemory: ServiceRepositoryInMemory;

describe("Create service", () => {
    beforeEach(() => {
        serviceRepositoryInMemory = new ServiceRepositoryInMemory();
        createServiceUseCase = new CreateServiceUseCase(
            serviceRepositoryInMemory
        );
    });

    it("should be able to create a new service", async () => {
        const service: ICreateServiceDTO = {
            name: "Corte de cabelo",
            description: "Corte de cabelo com a maquina",
            value: 25,
        };

        const response = await createServiceUseCase.execute(service);

        expect(response).toHaveProperty("id");
        expect(response.value).toBe(2500);
    });

    it("should not be able to create a serve with exists name", async () => {
        const service: ICreateServiceDTO = {
            name: "Corte de cabelo",
            description: "Corte de cabelo com a maquina",
            value: 25,
        };

        await createServiceUseCase.execute(service);

        await expect(
            createServiceUseCase.execute(service)
        ).rejects.toBeInstanceOf(AppError);
    });
});
