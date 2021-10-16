import express from 'express';
import pingRouter from './ping';

const routes = express.Router();
routes.use('/ping', pingRouter);
export default routes;