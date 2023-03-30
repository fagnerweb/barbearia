import { ICreateServiceDTO } from "../dtos/ICreateServiceDTO";
import { Service } from "../entities/Service";

interface IServiceRepository {
    create(data: ICreateServiceDTO): Promise<Service>;
    findByName(name: string): Promise<Service>;
}

export { IServiceRepository };
