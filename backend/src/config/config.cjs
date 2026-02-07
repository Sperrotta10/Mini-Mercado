const dotenv = require('dotenv');
dotenv.config();

function parseBoolean(value) {
    if (value === undefined || value === null) return false;
    return ['1', 'true', 'yes', 'on', 'prod', 'production'].includes(String(value).toLowerCase());
}

function getMySqlSslOptions() {
    if (!parseBoolean(process.env.DB_SSL)) return undefined;

    const caRaw = process.env.DB_SSL_CA;
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

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: (() => {
        const ssl = getMySqlSslOptions();
        return ssl ? { ssl } : undefined;
    })()
};
