import { AuthRepository } from '../repositories';
import { ILogin, IRegister, AuthData, IUser } from '../types';
import { User } from '../models';
import { ITokens } from '../types/token';

export class AuthService {
  private authRepository: AuthRepository = new AuthRepository();

  public register = async(data: IRegister): Promise<AuthData> => {
    const { email, tag } = data;
    await this.authRepository.checkExistance(email);
    await this.authRepository.checkTagExistance(tag);
    const newUser = new User(data);
    const user = await this.authRepository.register(newUser);
    const rawtokens: ITokens = await user.generateTokens();
    const tokens = {
      authToken: rawtokens.authToken.token,
      refreshToken: rawtokens.refreshToken.token,
    };
    return { user, tokens };
  }

  public login = async(data: ILogin): Promise<AuthData> => {
    const user: IUser = await this.authRepository.login(data);
    const rawtokens: ITokens = await user.generateTokens();
    const tokens = {
      authToken: rawtokens.authToken.token,
      refreshToken: rawtokens.refreshToken.token,
    };
    return { user, tokens };
  }

  public logout = async(user: IUser): Promise<boolean> => {
    const { _id } = user;
    const userDocument = await this.authRepository.getOneById(_id);
    if (userDocument) {
      return this.authRepository.logout(_id);
    }
    return Promise.resolve(false);
  }
}
