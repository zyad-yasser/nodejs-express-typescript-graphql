import { authorize, validate } from '../middlewares';
import { AuthService } from '../services';
import { registerSchema, loginSchema } from '../validation/auth.validation';
import { AuthData, ILogout } from '../types';
const authService: AuthService = new AuthService();

const register = async (args, { errorName, response }): Promise<AuthData> => {
  try {
    await validate(args, registerSchema);
    const authData = await authService.register(args);
    const { tokens }: any = authData;
    response
      .header('Authorization', tokens.authToken)
      .header('X-Refresh-Token', tokens.refreshToken);
    return authData;
  } catch (error) {
    throw new Error(errorName.EMAIL_EXISTS);
  }
};

const me = async (args, context): Promise<AuthData> => {
  try {
    await authorize(context);
    const { user, tokens } = context.auth;
    return { user, tokens };
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.UNAUTHORIZED);
  }
};

const login = async ({ input }, { response, errorName }): Promise<AuthData> => {
  try {
    await validate(input, loginSchema);
    const authData = await authService.login(input);
    const { tokens }: any = authData;
    response
      .header('Authorization', tokens.authToken)
      .header('X-Refresh-Token', tokens.refreshToken);
    return authData;
  } catch (error) {
    throw new Error(errorName.INVALID_LOGIN);
  }
};

const logout = async (args, context): Promise<ILogout> => {
  try {
    await authorize(context);
    const { user } = context.auth;
    const isLoggedout = await authService.logout(user);
    return {
      isLoggedout,
    };
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const authResolver = {
  register,
  login,
  logout,
  me,
};
