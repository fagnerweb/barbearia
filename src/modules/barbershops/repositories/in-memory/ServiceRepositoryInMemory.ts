import { ICreateServiceDTO } from "../../dtos/ICreateServiceDTO";
import { Service } from "../../entities/Service";
import { IServiceRepository } from "../IServiceRepository";

class ServiceRepositoryInMemory implements IServiceRepository {
    private repository: Service[] = [];

    async create({
        name,
        description,
        value,
    }: ICreateServiceDTO): Promise<Service> {
        const service = new Service();

        Object.assign(service, {
            name,
            description,
            value,
        });

        this.repository.push(service);

        return service;
    }

    async findByName(name: string): Promise<Service> {
        const service = this.repository.find(
            (service) => service.name === name
        );
        return service;
    }
}

export { ServiceRepositoryInMemory };
