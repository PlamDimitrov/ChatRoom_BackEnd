const env = process.env.NODE_ENV || 'development';

class Configuration {
  public config: {
    port: any,
    socketPort: any,
    dbURL: string,
    cookie: string
  };

  constructor(enviremant: string) {
    this.config = {
      port: '',
      socketPort: '',
      dbURL: '',
      cookie: ''
    };
    enviremant === 'development' ? this.setDevelopmentEnvironment() : this.setProductionEnvironment();
  }
  private setDevelopmentEnvironment() {
    this.config = {
      port: process.env.PORT || 8000,
      socketPort: process.env.SOCKET_PORT || 8080,
      dbURL: 'mongodb://localhost:27017/',
      cookie: 'auth-token'
    }
  }
  private setProductionEnvironment() {
    this.config = {
      port: process.env.PORT || 3000,
      socketPort: process.env.SOCKET_PORT || 3030,
      dbURL: 'mongodb://localhost:27017/',
      cookie: 'auth-token'
    }
  }
};

const config = new Configuration(env);

export = config;