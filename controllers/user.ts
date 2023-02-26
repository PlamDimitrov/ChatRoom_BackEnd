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
    models.User.findOne({ userName: { $eq: user.userName } })
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
      const { userName, email } = req.body;
      const newUser: IUser = { userName, email };
      this.createUser(newUser, req, res, next);
    },
    login: (req: any, res: any, next: any) => {
      const { userName, email } = req.body;
      const newUser: IUser = { userName, email };
      this.findUser(newUser, req, res, next);
    }
  }
}

export default new UserConproller();