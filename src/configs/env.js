import dotenv from 'dotenv';
dotenv.config();

export const envVariables = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.DB_URI || '',
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'thisissecret',
    usernameAdmin: process.env.USERNAME_ADMIN || 'admin',
    passwordAdmin: process.env.PASSWORD_ADMIN || '123456',
    usernameEmail: process.env.USERNAME_EMAIL || '',
    passwordEmail: process.env.PASSWORD_EMAIL || '',

};