import { Express } from 'express'

import { openAi, user } from "../router";

const router = (app: Express) => {
    app.use('/ai', openAi);
    app.use('/user', user);
};

export default router;