import { HttpServer, envVariables, dbConnection } from "./configs"

const { port, mongoURI } = envVariables;

export let server;

const main = async () => {
    server = new HttpServer(port);
    server.listen();

    dbConnection(mongoURI);
}
main();