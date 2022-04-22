import { HttpServer, envVariables, dbConnection } from "./configs";
import { initAccountAdmin } from './utils';

import {
    authRouter,
    adminRouter,
    cvRouter,
    followRouter,
    permissionRouter
} from './routes';
import bodyParser from 'body-parser';

const { port, mongoURI } = envVariables;

export let server;

const main = async () => {
    server = new HttpServer(port);
    server.getApp().use(bodyParser.json());
    server.getApp().use(bodyParser.urlencoded({ extended: true }));
    server.listen();

    dbConnection(mongoURI);

    // api
    server.registerRouter(authRouter);
    server.registerRouter(adminRouter);
    server.registerRouter(cvRouter);
    server.registerRouter(followRouter);
    server.registerRouter(permissionRouter);

    // init account admin
    initAccountAdmin();
}
main();