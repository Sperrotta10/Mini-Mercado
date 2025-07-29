import dotenv from 'dotenv';
dotenv.config();

export const enviroment = {
    PORT : process.env.PORT,
    DB_NAME : process.env.DB_NAME,
    DB_HOST : process.env.DB_HOST,
    DB_USER : process.env.DB_USER,
    DB_PORT : process.env.DB_PORT,
    DB_PASSWORD : process.env.DB_PASSWORD,
    SALT : process.env.SALT,
    ROLE_DEFAULT : process.env.ROLE_DEFAULT,
    SECURE_COOKIE : process.env.SECURE_COOKIE,
    SECURE_DB : process.env.SECURE_DB,
    JWT_SECRET : process.env.JWT_SECRET,
    SESSION_SECRET : process.env.SESSION_SECRET,
    COOKIE_SECRET : process.env.COOKIE_SECRET,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    SUPABASE_URL : process.env.SUPABASE_URL,
    SUPABASE_KEY : process.env.SUPABASE_KEY,
    FRONTEND_URL : process.env.FRONTEND_URL,
    SMTP_HOST : process.env.SMTP_HOST,
    SMTP_PORT : process.env.SMTP_PORT,
    SMTP_USER : process.env.SMTP_USER,
    SMTP_PASS : process.env.SMTP_PASS,
    SMTP_SECURE : process.env.SMTP_SECURE,
}