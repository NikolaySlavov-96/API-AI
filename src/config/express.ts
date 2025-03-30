import { Express } from 'express'

import { authorization } from '../middlewares';

const config = (app: Express, express: any) => {
    app.use(express.json());
    app.use(authorization());
};

export default config;