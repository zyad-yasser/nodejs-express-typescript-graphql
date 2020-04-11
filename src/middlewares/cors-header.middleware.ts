export const corsHeader = (req, res, next) => {
  res.header('Access-Control-Request-Method', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Expose-Headers',
    'content-type, Content-Type, Authorization, X-Refresh-Token,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'content-type, Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Refresh-Token,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin',
  );
  next();
};
