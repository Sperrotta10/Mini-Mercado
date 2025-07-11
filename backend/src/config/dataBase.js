import { Sequelize } from 'sequelize';
import { enviroment } from './enviroment.js';

export const sequelize = new Sequelize(
    enviroment.DB_NAME,
    enviroment.DB_USER,
    enviroment.DB_PASSWORD,
    {
        host: enviroment.DB_HOST,
        port: enviroment.DB_PORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);