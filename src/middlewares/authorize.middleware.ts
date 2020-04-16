export const authorize = ({ auth, errorName }, throwError = true): Boolean => {
  const { isAuthenticated, roleAuthorized } = auth;
  if (!isAuthenticated || !roleAuthorized && throwError) {
    throw new Error(errorName.UNAUTHORIZED);
  } else if (!isAuthenticated || !roleAuthorized) {
    return false;
  }
  return true;
};
