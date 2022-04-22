import express from 'express';
import http from 'http';
import log from 'datalog';

export class HttpServer {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.server = http.Server(this.app);
    }

    getApp() {
        return this.app;
    }

    registerMiddleware(middleware) {
		middleware(this.app);
	}

    registerRouter(router) {
        this.app.use(router);
    }

    listen() {
        this.server.listen(this.port, () => {
            log.info(`Server is listen on port ${this.port}`);
        });
    }
}