import Joi from 'joi';
import { validateRequest } from '../utils';

const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).max(50).empty('').required(),
    })
    validateRequest(req, next, schema);
}

export const validateRequestBody = {
    loginSchema
}