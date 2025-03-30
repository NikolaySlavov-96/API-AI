import { Express } from 'express'

import { openAi, user } from "../router";
import { isAuthenticated } from '../middlewares';

const router = (app: Express) => {
    app.use('/ai', isAuthenticated(), openAi);
    app.use('/user', user);
};

export default router;