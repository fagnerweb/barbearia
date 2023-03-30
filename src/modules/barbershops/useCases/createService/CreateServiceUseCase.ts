import { AppError } from "../../../../errors/AppError";
import { Service } from "../../entities/Service";
import { IServiceRepository } from "../../repositories/IServiceRepository";

interface IRequest {
    name: string;
    description: string;
    value: number;
}

class CreateServiceUseCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute({ name, description, value }: IRequest): Promise<Service> {
        const serviceAlreadyExists = await this.serviceRepository.findByName(
            name
        );

        if (serviceAlreadyExists) {
            throw new AppError("Service already create");
        }

        const newValue = value * 100;

        const service = await this.serviceRepository.create({
            name,
            description,
            value: newValue,
        });

        return service;
    }
}

export { CreateServiceUseCase };
