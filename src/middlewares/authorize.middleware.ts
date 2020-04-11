export const authorize = ({ auth, errorName }) => {
  const { isAuthenticated, roleAuthorized } = auth;
  if (!isAuthenticated || !roleAuthorized) {
    throw new Error(errorName.UNAUTHORIZED);
  }
};
