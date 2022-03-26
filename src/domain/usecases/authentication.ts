import {
  IAuthenticationParams, IAuthenticationResult, IAuthenticationService, IEncoder, ITokenManager,
} from '../contracts/gateways';
import { IUserRepository } from '../contracts/repositories/user-repo';
import { InvalidEmailError } from '../entities/error/invalid-email-error';
import { InvalidPasswordError } from '../entities/error/invalid-password-error';

export class CustomAuthentication implements IAuthenticationService {
  constructor(private readonly userRepository: IUserRepository, private readonly encoder: IEncoder, private readonly tokenManager: ITokenManager) {}

  async auth(authenticationParam: IAuthenticationParams): Promise<InvalidEmailError | InvalidPasswordError | IAuthenticationResult> {
    const user = await this.userRepository.findByEmail(authenticationParam.email);

    if (!user) {
      return new InvalidEmailError(authenticationParam.email);
    }

    const matches = await this.encoder.compare(authenticationParam.password, user.password);
    if (!matches) {
      return new InvalidPasswordError();
    }

    const accessToken = await this.tokenManager.sign({ id: user.id as string });

    return {
      accessToken,
      id: user.id as string,
    };
  }
}
