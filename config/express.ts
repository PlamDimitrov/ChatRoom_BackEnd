import { config } from "../config/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export default (app: any) => {

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

  app.use(bodyParser.urlencoded({ extended: true }));
};
