import app from "express";
import { config } from "./config/config";
import express from './config/express';
import Socket from './config/socket';
import database from './config/database';
import routes from './config/routes';
const application = app();
const socket = new Socket(application);


database()
  .then(() => {
    express(application, app);
    routes(application);
    application.listen(config.port, () => console.log(`Server active on port: ${config.port}_____________________________________________`));
    socket.createServer(config.socketPort, () => console.log(`Socket active on port: ${config.socketPort}_____________________________________________`));
  });

global.AppGlobal = socket;