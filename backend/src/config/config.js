import { enviroment } from "./enviroment.js";

export const development = {
    username: enviroment.DB_USER,
    password: enviroment.DB_PASSWORD,
    database: enviroment.DB_NAME,
    host: enviroment.DB_HOST,
    dialect: "mysql"
};
