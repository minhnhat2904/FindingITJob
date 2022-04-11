import dotenv from 'dotenv';
dotenv.config();

export const envVariables = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.DB_URI || '',
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'thisissecret'
};