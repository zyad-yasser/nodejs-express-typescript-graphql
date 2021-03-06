import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../models';

const setAuth = (isAuthenticated, roleAuthorized, req, next): void => {
  if (!req.auth) {
    req.auth = {};
  }
  req.auth.isAuthenticated = isAuthenticated;
  req.auth.roleAuthorized = roleAuthorized;
  return next();
};

const jwtVerifyAndGetDecoded = (authToken, privateKey): Promise<any> => {
  return new Promise((resolve) => {
    return jwt.verify(authToken, privateKey, (error, decoded) => {
      if (error) {
        return resolve(null);
      }
      return resolve(decoded);
    });
  });
};

const getUser = async(id: string, req, next): Promise<any> => {
  const user = await User.findById(id);

  return user;
};

const getSplittedTokens = (req): Promise<[string, string, string[], string[]]> => {
  return new Promise((resolve, reject) => {
    const authToken = req.header('Authorization') || req.cookies.auth;
    const refreshToken = req.header('X-Refresh-Token') || req.cookies.refresh;
    if (!authToken || !refreshToken) {
      return reject();
    }
    const splittedAuthToken = authToken.split(' ');
    const splittedRefreshToken = refreshToken.split(' ');
    if (
      splittedAuthToken.length !== 2
      || splittedAuthToken[0] !== 'Bearer'
      || splittedRefreshToken.length !== 2
      || splittedRefreshToken[0] !== 'Bearer'
    ) {
      return reject();
    }

    return resolve([authToken, refreshToken, splittedAuthToken, splittedRefreshToken]);
  });
};

export async function authenticate(req, res, next): Promise<void> {
  try {
    let user;
    const [authToken, refreshToken, splittedAuthToken, splittedRefreshToken] = await getSplittedTokens(req);
    let tokens: any = { authToken, refreshToken };
    const decodedObjectFromAuthToken = await jwtVerifyAndGetDecoded(splittedAuthToken[1], config.authToken.key);
    if (decodedObjectFromAuthToken) {
      const { _id } = decodedObjectFromAuthToken;
      user = await getUser(_id, req, next);
    } else {
      const decodedObjectFromRefreshToken = await jwtVerifyAndGetDecoded(splittedRefreshToken[1], config.refreshToken.key);
      if (decodedObjectFromRefreshToken) {
        const { _id } = decodedObjectFromRefreshToken;
        user = await getUser(_id, req, next);
        if (user) {
          const rawTokens = await user.generateTokens(null, splittedRefreshToken[1]);
          tokens = {
            authToken: rawTokens.authToken.token,
            refreshToken: rawTokens.refreshToken.token,
          };
        }
      } else {
        throw new Error('Unauthenticated');
      }
    }
    if (user && tokens) {
      req.auth = {};
      req.auth.user = user;
      const outputTokes = {
        authToken: tokens.authToken,
        refreshToken: tokens.refreshToken,
      };
      req.auth.tokens = outputTokes;
      res
        .header('Authorization', tokens.authToken)
        .header('X-Refresh-Token', tokens.refreshToken);
      setAuth(true, true, req, next);
    } else {
      throw new Error('Unauthenticated');
    }
  } catch {
    setAuth(false, false, req, next);
  }
}
