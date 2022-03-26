import { InvalidEmailError } from '@/domain/entities/error/invalid-email-error';
import { InvalidPasswordError } from '@/domain/entities/error/invalid-password-error';

export interface IAuthenticationParams {
    email: string
    password: string
}

export interface IAuthenticationResult {
    accessToken: string
    id: string
}

export interface IAuthenticationService {
    auth (authenticationParam: IAuthenticationParams):Promise<InvalidEmailError | InvalidPasswordError | IAuthenticationResult>
}
