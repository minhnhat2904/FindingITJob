import { HttpServer, envVariables, dbConnection } from "./configs";

import { authRouter } from './routes';
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
}
main();