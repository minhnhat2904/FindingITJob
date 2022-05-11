import { HttpServer, envVariables, dbConnection } from "./configs";
import { initAccountAdmin } from "./utils";

import {
    authRouter,
    adminRouter,
    cvRouter,
    followRouter,
    permissionRouter,
    iterRouter,
    postRouter,
} from './routes';
import bodyParser from 'body-parser';
import log from 'datalog';


const { port, mongoURI } = envVariables;

export let server;

const main = async () => {
  server = new HttpServer(port);
  server.getApp().use(bodyParser.json());
  server.getApp().use(bodyParser.urlencoded({ extended: true }));
  server.listen();

  dbConnection(mongoURI);
  log.info("n");
  
  // swagger
  server.registerSwagger();
  log.info("n2");
  
  // api
  server.registerRouter(authRouter);
  server.registerRouter(adminRouter);
  server.registerRouter(cvRouter);
  server.registerRouter(followRouter);
  server.registerRouter(permissionRouter);
  server.registerRouter(iterRouter);
  server.registerRouter(postRouter);
  
  log.info("n3");
  initAccountAdmin();
  log.info("n4");
};
main();
