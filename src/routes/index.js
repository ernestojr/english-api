import { Router } from 'express';

export default (app) => {
  const router = Router();
  return router.get('/', function(req, res) {
    res.json({ message: 'Hello World' });
  });
};
