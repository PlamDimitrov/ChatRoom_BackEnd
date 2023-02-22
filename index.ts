import app from "express";
import { config } from "./config/config";
import express from './config/express';
import database from './config/database';

database()
  .then(() => {
    express(app());
    app().listen(config.port, () => console.log(`Server active on port: ${config.port}_____________________________________________`));
  });