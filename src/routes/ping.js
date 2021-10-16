import express from 'express';

import * as controller from '~/app/controllers/ping';

const pingRouter = express.Router();

pingRouter.route('/').get(controller.index);

export default pingRouter;