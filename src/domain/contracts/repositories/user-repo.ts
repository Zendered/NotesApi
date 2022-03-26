import { IUserDTO } from '../gateways';

export interface IUserRepository {
    findAll(): Promise<IUserDTO[]>
    findByEmail(email: string): Promise<IUserDTO>
    add(userData: IUserDTO): Promise<IUserDTO>
}
