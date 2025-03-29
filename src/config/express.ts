import { Express } from 'express'

const config = (app: Express, express: any) => {
    app.use(express.json());
};

export default config;