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

  private findUser(user: IUser, req: any, res: any, next: any) {
    models.User.findOne({ username: { $eq: user.username } })
      .then((user) => {
        if (user === null) {
          res.status(401).send({ error: 'No such user found!' });
          return;
        } else {
          res.cookie(config.cookie, user)
            .send(user)
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
      console.log(stayLoggedIn);

      const newUser: IUser = { username, password };
      this.findUser(newUser, req, res, next);
    }
  }
}

export default new UserConproller(); 