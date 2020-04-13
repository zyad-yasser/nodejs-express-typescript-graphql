import { CoursesService } from '../services/courses.service';
import { authorize, validate } from '../middlewares';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validation/auth.validation';
import { AuthData } from '../types/auth';
const coursesService: CoursesService = new CoursesService();
const authService: AuthService = new AuthService();

const register = async (args, { errorName }): Promise<AuthData> => {
  try {
    await validate(args, registerSchema);
    const authData = await authService.register(args);
    return authData;
  } catch (error) {
    throw new Error(errorName.EMAIL_EXISTS);
  }
};

const login = async (args, { errorName }): Promise<AuthData> => {
  try {
    await validate(args, loginSchema);
    const authData = await authService.login(args);
    return authData;
  } catch (error) {
    throw new Error(errorName.INVALID_LOGIN);
  }
};

const logout = async (args, context): Promise<boolean> => {
  try {
    await authorize(context);
    const user = context.auth.user;
    return authService.logout(user);
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const authResolver = {
  register,
  login,
  logout,
};
