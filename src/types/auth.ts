import { IUser } from '.';
import { ITokens } from './token';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface AuthData {
  user: IUser;
  tokens: ITokens;
}

export interface ILogout {
  isLoggedout: boolean;
}
