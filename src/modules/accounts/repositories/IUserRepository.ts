import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
    create({ name, email, password }: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { ICreateUserDTO, IUserRepository };
