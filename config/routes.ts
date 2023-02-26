import routers from '../routers';

export = (app: any) => {
  app.use('/api/user', routers.user);
  app.use('*', (req: any, res: any, next: any) => {
    res.send('Not Found!');
  })
}