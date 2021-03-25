import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return user;
    }

    return;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    if (user) {
      return user;
    }

    return;
  }

  turnAdmin(receivedUser: User): User {
    const newUsers = this.users.map((user) =>
      user.id === receivedUser.id
        ? {
            ...user,
            admin: true,
            updated_at: new Date()
          }
        : user
    );

    this.users = newUsers;

    const updatedUser = {
      ...receivedUser,
      admin: true
    };

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
