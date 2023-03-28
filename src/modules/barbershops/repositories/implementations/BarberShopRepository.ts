import { getRepository, Repository } from "typeorm";

import { BarberShop } from "../../entities/BarberShop";
import {
    IBarberShopRepository,
    ICreateBarberShopDTO,
} from "../IBarberShopRepository";

class BarberShopRepository implements IBarberShopRepository {
    private repository: Repository<BarberShop>;

    constructor() {
        this.repository = getRepository(BarberShop);
    }

    async create({
        name,
        address,
        city,
        state,
        zipCode,
        phone,
        email,
    }: ICreateBarberShopDTO): Promise<BarberShop> {
        const babershop = this.repository.create({
            name,
            address,
            city,
            state,
            zipCode,
            phone,
            email,
        });

        await this.repository.save(babershop);

        return babershop;
    }

    async findByName(name: string): Promise<BarberShop> {
        const babershop = await this.repository.findOne({ name });
        return babershop;
    }

    async findById(id: string): Promise<BarberShop> {
        const barbershopById = await this.repository.findOne(id);
        return barbershopById;
    }

    async list(): Promise<BarberShop[]> {
        const all = this.repository.find();
        return all;
    }
}

export { BarberShopRepository };
