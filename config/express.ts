import { config } from "../config/config";
import cookieParser from "cookie-parser";
import express from "express";
const cors = require('cors');

export default (app: any) => {

  app.use(cors());
  app.use((req: any, res: any, next: any) => {

    if (req.cookies) {
      res.locals.isLoggedIn = req.cookies[config.cookie] !== 'undefined';
    }
    if (req.user) {
      res.locals.userName = req.user;
      console.log(`${req.user} has logged in.`);
    }
    next();
  });

  app.use(cookieParser());
  app.use(express.json());
};
