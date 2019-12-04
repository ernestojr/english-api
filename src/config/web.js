export default (app) => {
  const { NODE_ENV, PORT } = app.env;
  return {
    port: PORT || 3000,
    env: NODE_ENV || 'development',
  };
};
