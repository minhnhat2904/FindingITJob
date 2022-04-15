import Joi from 'joi';
import { validateRequest } from '../utils';
/* auth */
const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).max(50).empty('').required(),
    })
    validateRequest(req, next, schema);
}

const registerSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().alphanum().required().min(6).max(50),
        email: Joi.string().email().required(),
    })

    validateRequest(req, next, schema);
}

const updatePasswordSchema = (req, res, next) => {
    const schema = Joi.object({
		password: Joi.string().alphanum().min(6).max(50).empty('').required(),
		newPassword: Joi.string().alphanum().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
}

const requestResetPassword = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
	});
	validateRequest(req, next, schema);
};

const changeResetPassword = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		code: Joi.string().required(),
		password: Joi.string().alphanum().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};

const updateInfoSchema = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		address: Joi.string().empty(),
		phone: Joi.string()
			.empty()
			.regex(/^(84|0[1-9])+([0-9]{8,20})$/)
			.message(`phone incorrect format`),
		image: Joi.string().empty(),
	});
	validateRequest(req, next, schema);
};

/* admin */
const loginAdminSchema = (req, res, next) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};



export const validateRequestBody = {
    loginSchema,
    registerSchema,
    updatePasswordSchema,
    requestResetPassword,
    changeResetPassword,
    updateInfoSchema,
    loginAdminSchema
}