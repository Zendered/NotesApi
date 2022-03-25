import { IUserDTO } from '../contracts/gateways';
import { EmailValidation } from './email-validator';
import { Entity } from './entity';
import { InvalidEmailError } from './error/invalid-email-error';
import { InvalidPasswordError } from './error/invalid-password-error';
import { PasswordValidation } from './password-validator';

export class User extends Entity<IUserDTO> {
  private constructor(props: IUserDTO, id?: string) {
    super(props, id);
  }

  static create(props: IUserDTO, id?: string): User | InvalidEmailError {
    const emailOrError = EmailValidation(props.email);
    if (!emailOrError) {
      return new InvalidEmailError(props.email);
    }

    const passwordOrError = PasswordValidation(props.password);
    if (!passwordOrError) {
      return new InvalidPasswordError();
    }

    return new User(props, id);
  }
}
