import { set, connect } from "mongoose";
import { config } from "./config";

const dbName = 'chatRoom';
set('strictQuery', false);
export = () => {
  return connect(config.dbURL + dbName)
    .then(res => console.log(`Database has been initialized!`))
    .catch(error => console.error(`Error on database connection: ${error}`));
};