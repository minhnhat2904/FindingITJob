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

const createModSchema = (req, res, next) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};


/* post */
const createCVSchema = (req, res, next) => {
	const schema = Joi.object({
		skill: Joi.array().min(1).items(Joi.string()).required().messages({ 'array.min': `skill cannot be an empty` }),
		softSkill: Joi.string().required(),
		experience: Joi.string().required(),
		description: Joi.string().required(),
		birthday: Joi.string()
			.required()
			.regex(
				/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
			)
			.message('birthday incorrect format'),
		image: Joi.string().required(),
	});
	validateRequest(req, next, schema);
};

const updateCVSchema = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().empty(),
		skill: Joi.array().min(1).items(Joi.string()).empty().messages({ 'array.min': `skill cannot be an empty` }),
		softSkill: Joi.string().empty(),
		email: Joi.string().email().empty(),
		experience: Joi.string().empty(),
		description: Joi.string().empty(),
		birthday: Joi.string()
			.empty()
			.regex(
				/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
			)
			.message('birthday incorrect format'),
		image: Joi.string(),
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
    loginAdminSchema,
	createModSchema,
	createCVSchema,
	updateCVSchema
}