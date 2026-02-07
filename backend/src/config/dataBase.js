import { Sequelize } from 'sequelize';
import { enviroment } from './enviroment.js';

function parseBoolean(value) {
    if (value === undefined || value === null) return false;
    return ['1', 'true', 'yes', 'on', 'prod', 'production'].includes(String(value).toLowerCase());
}

function getMySqlSslOptions() {
    if (!parseBoolean(enviroment.DB_SSL)) return undefined;

    const caRaw = enviroment.DB_SSL_CA;
    if (!caRaw) {
        return { rejectUnauthorized: true };
    }

    const ca = caRaw.includes('BEGIN CERTIFICATE')
        ? caRaw
        : Buffer.from(caRaw, 'base64').toString('utf8');

    return {
        rejectUnauthorized: true,
        ca
    };
}

export const sequelize = new Sequelize(
    enviroment.DB_NAME,
    enviroment.DB_USER,
    enviroment.DB_PASSWORD,
    {
        host: enviroment.DB_HOST,
        port: enviroment.DB_PORT,
        dialect: 'mysql',
        dialectOptions: (() => {
            const ssl = getMySqlSslOptions();
            return ssl ? { ssl } : undefined;
        })(),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);