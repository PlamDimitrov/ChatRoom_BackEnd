import app from "express";
import { config } from "./config/config";
import express from './config/express';
import database from './config/database';
import routes from './config/routes';
const application = app();

database()
  .then(() => {
    express(application);
    routes(application);
    application.listen(config.port, () => console.log(`Server active on port: ${config.port}_____________________________________________`));
  });
