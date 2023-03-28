import { ICreateBarberShopDTO } from "../dtos/ICreateBarberShopDTO";
import { BarberShop } from "../entities/BarberShop";

interface IBarberShopRepository {
    create({
        name,
        address,
        city,
        state,
        zipCode,
        phone,
        email,
        user_id,
    }: ICreateBarberShopDTO): Promise<BarberShop>;
    findByName(name: string): Promise<BarberShop>;
    findById(id: string): Promise<BarberShop>;
    list(): Promise<BarberShop[]>;
}

export { ICreateBarberShopDTO, IBarberShopRepository };
