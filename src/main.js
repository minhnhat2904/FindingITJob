import { HttpServer, envVariables, dbConnection } from "./configs";
import { initAccountAdmin } from "./utils";
import cron from 'node-cron';
import { Post } from "../src/models";

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
  const task = cron.schedule('0 0 */1 * *', async () => {
    const posts = await Post.find();
    for(const post of posts) {
      let date = post.endTime.split('/');
      const expiredDate = new Date(date[1] + "/" + date[0] + "/" + date[2]);
      const now = new Date();
      if(expiredDate < now) {
        post.status = "DONE";
        await post.save();
      }
    }
  }, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh"
  });

  task.start();
};
main();
