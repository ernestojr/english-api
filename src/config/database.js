import mongoose from 'mongoose';

export default async (app) => {
  const { MONGODB_URI } = app.env;
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.logger.info('Database connected.');
  } catch (error) {
    app.logger.error(error);
  }
};
