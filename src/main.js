import { HttpServer, envVariables, dbConnection } from "./configs";
import { initAccountAdmin, task } from "./utils";

import {
    authRouter,
    adminRouter,
    cvRouter,
    followRouter,
    permissionRouter,
    iterRouter,
    postRouter,
    companyRouter,
    feedbackRouter,
    analysisRouter,
    notificationRouter,
    imageRouter
} from './routes';
import bodyParser from 'body-parser';


const { port, mongoURI } = envVariables;
import { defaultMiddleware, handleError } from './middlewares';

export let server;

const main = async () => {
  server = new HttpServer(port);
  server.getApp().use(bodyParser.json());
  server.getApp().use(bodyParser.urlencoded({ extended: true }));
  server.registerMiddleware(defaultMiddleware);
  server.listen();

  dbConnection(mongoURI);
  
  // swagger
  server.registerSwagger();
  
  // api
  server.registerRouter(authRouter);
  server.registerRouter(adminRouter);
  server.registerRouter(cvRouter);
  server.registerRouter(followRouter);
  server.registerRouter(permissionRouter);
  server.registerRouter(iterRouter);
  server.registerRouter(postRouter);
  server.registerRouter(companyRouter);
  server.registerRouter(feedbackRouter);
  server.registerRouter(analysisRouter);
  server.registerRouter(notificationRouter);
  server.registerRouter(imageRouter);
  
  initAccountAdmin();
  server.registerMiddleware(handleError);
  task.start();
};
main();
