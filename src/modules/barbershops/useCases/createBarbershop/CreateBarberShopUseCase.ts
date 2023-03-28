import { BarberShop } from "../../entities/BarberShop";
import { IBarberShopRepository } from "../../repositories/IBarberShopRepository";

interface IRequest {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    user_id: string;
}

class CreateBarberShopUseCase {
    constructor(private baberShopRepository: IBarberShopRepository) {}

    async execute({
        name,
        address,
        city,
        state,
        zipCode,
        phone,
        email,
        user_id,
    }: IRequest): Promise<BarberShop> {
        const barberShop = await this.baberShopRepository.create({
            name,
            address,
            city,
            state,
            zipCode,
            phone,
            email,
            user_id,
        });

        return barberShop;
    }
}

export { CreateBarberShopUseCase };
