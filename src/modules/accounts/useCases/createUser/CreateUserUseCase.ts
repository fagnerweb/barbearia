import { hash } from "bcryptjs";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute({ name, email, password }: IRequest): Promise<User> {
        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        if (password.length < 8) {
            throw new AppError("Password must be at least 8 characters long");
        }
        const passwordhash = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            password: passwordhash,
        });

        return user;
    }
}

export { CreateUserUseCase };
