import cookieParser from "cookie-parser";
import cors from 'cors';
import { config } from "../config/config";

export default (app: any, express: any) => {

  app.use(cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
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
