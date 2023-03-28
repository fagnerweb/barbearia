import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../../accounts/repositories/IUserRepository";
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
    constructor(
        private baberShopRepository: IBarberShopRepository,
        private userRepository: IUserRepository
    ) {}

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
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User is not exists");
        }
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
