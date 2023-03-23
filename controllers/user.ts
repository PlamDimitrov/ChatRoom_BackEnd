import models from '../Models';
import { config } from '../config/config';
import IUser from '../Interfaces/IUser';

class UserConproller {

  private createUser(user: IUser, req: any, res: any, next: any) {
    models.User.create(user)
      .then(() => {
        res.status(200);
        res.send({ user });
      })
      .catch(err => {
        console.log(err);
        res.status(409)
        res.send(err)
      })
  }

  private findUser(stayLoggedIn: Boolean, userFromClient: IUser, req: any, res: any, next: any) {
    models.User.findOne({ username: { $eq: userFromClient.username } })
      .then((user) => {
        if (user === null) {
          res.status(401).send({ error: 'No such user found!' });
          return;
        } else {
          if (user.password === userFromClient.password) {
            const now = new Date();
            const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const oneDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            stayLoggedIn
              ? res.cookie(config.cookie, JSON.stringify(user), { expires: nextWeek })
              : res.cookie(config.cookie, JSON.stringify(user), { expires: oneDay })
            res.send(user)
          } else {
            res.status(401).send('Wrong password!');
          }
        }
      }).catch(err => {
        console.log(err);
        res.status(401)
        res.send(`Database error: ${err}`);
      })
  }

  public get = {
    userInfo: (req: any, res: any, next: any) => {
    },
    logout: (req: any, res: any, next: any) => {
      res.clearCookie(config.cookie)
        .send('Logout successfully!');
    },
  }

  public post = {
    register: (req: any, res: any, next: any) => {
      const { username, email, password } = req.body;
      const newUser: IUser = { username, email, password };
      this.createUser(newUser, req, res, next);
    },
    login: (req: any, res: any, next: any) => {
      const { username, password, stayLoggedIn } = req.body;
      const newUser: IUser = { username, password };
      this.findUser(stayLoggedIn, newUser, req, res, next);
    }
  }
}

export default new UserConproller(); 