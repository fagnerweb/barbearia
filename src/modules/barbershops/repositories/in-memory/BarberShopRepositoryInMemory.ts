import { BarberShop } from "../../entities/BarberShop";
import {
    IBarberShopRepository,
    ICreateBarberShopDTO,
} from "../IBarberShopRepository";

class BarbeShopRepositoryInMemory implements IBarberShopRepository {
    private barbershops: BarberShop[] = [];

    async create({
        name,
        address,
        city,
        state,
        zipCode,
        phone,
        email,
    }: ICreateBarberShopDTO): Promise<BarberShop> {
        const baberShop = new BarberShop();
        Object.assign(baberShop, {
            name,
            address,
            city,
            state,
            zipCode,
            phone,
            email,
        });

        this.barbershops.push(baberShop);
        return baberShop;
    }

    async findByName(name: string): Promise<BarberShop> {
        const barbershop = this.barbershops.find(
            (barber) => barber.name === name
        );
        return barbershop;
    }

    async findById(id: string): Promise<BarberShop> {
        return this.barbershops.find((barber) => barber.id === id);
    }

    async list(): Promise<BarberShop[]> {
        return this.barbershops;
    }
}

export { BarbeShopRepositoryInMemory };
