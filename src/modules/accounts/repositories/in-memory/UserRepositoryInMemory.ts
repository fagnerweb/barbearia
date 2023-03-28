import { User } from "../../entities/User";
import { ICreateUserDTO, IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
    private users: User[] = [];

    async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            name,
            email,
            password,
        });

        this.users.push(user);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);
        return user;
    }
}

export { UserRepositoryInMemory };
