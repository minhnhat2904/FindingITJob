import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import express from 'express';

export const defaultMiddleware = (app) => {
	app.use(
		express.urlencoded({
			extended: true,
		}),
	);

	app.use(express.json());
	app.use(
		helmet({
			contentSecurityPolicy: false,
		}),
	);
	app.use(
		cors({
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		}),
	);
	app.use(express.static('public'));
	app.use(express.static(path.join(__dirname, 'js')));
};