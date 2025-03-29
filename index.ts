import express from 'express';

import {
    expressConfig,
    routerConfig,
    checkDatabaseIfItExist,
} from './src/config';

import { errorHandling, } from './src/middlewares';

import db from './src/models';

const { PORT } = process.env;

start();

async function start() {
    try {
        const app = express();

        await checkDatabaseIfItExist();

        await db.sequelize.authenticate();

        // await db.sequelize.sync({ force: true, });
        await db.sequelize.sync({ force: false, });

        expressConfig(app, express);
        routerConfig(app);

        app.use(errorHandling());

        app.listen(PORT, () => console.log("🚀 ~ start ~ listen:", PORT));
    } catch (err) {
        console.log("🚀 ~ start ~ err:", err)
    }
}

process.on('SIGINT', async () => {
    console.log(`🛑 Application shutting down env: {ENV}`)
    process.exit(0);
});