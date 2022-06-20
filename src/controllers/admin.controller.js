import bcrypt from 'bcryptjs';
import { HttpError, tokenEncode, pagination } from '../utils';
import { Admin, Permission, UserPermission } from '../models';
import mongo from 'mongoose';


const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const account = await Admin.findOne({ username });
        if (!account) {
            throw new HttpError('Username is uncorrect');
        }

        const match = await bcrypt.compare(password, account.password);
        if (!match) {
            throw new HttpError('Password is uncorrect');
        }
        const data = {
            username,
            _id: account._id,
            role: account.role,
        };
        const token = tokenEncode(data);
        res.status(200).json({
            status: 200,
            msg: 'Success',
            token,
            role: account.role,
            username
        })
    } catch (error) {
        next(error);
    }
}

const createMod = async (req, res, next) => {
	let { username, password } = req.body;
	username = username.toLowerCase();
	try {
		const mod = await Admin.findOne({ username }, { password: 0 });
		if (mod) {
            throw new HttpError('Username is exist', 400);
        }
		const hash = await bcrypt.hash(password, 12);
		if (!hash) {
            throw new HttpError('Fail', 400);
        }
		const account = await Admin.create({
			username,
			password: hash,
			role: 'moderator',
		});
		let permissions = await Permission.find({
			role: 'moderator',
			check: true,
		});
		permissions = permissions.map((permission) => {
			return UserPermission.create({
				userId: account._id,
				permissionId: permission._id,
				permissionName: permission.perName,
				actionCode: permission.actionCode,
				check: true,
			});
		});
		await Promise.all(permissions);

		res.status(200).json({
			status: 200,
			msg: 'Create mod success',
		});
	} catch (error) {
		next(error);
	}
};

const getMods = async (req, res, next) => {
	const { page, take } = req.query;
	try {
		let data = await pagination(Admin, { role: 'moderator', deleted_flag: false }, page, take, { password: 0, role: 0 });
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

const deleteMod = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(id)) {
            throw new HttpError('id mod is incorrect', 400);
        } 
		// const mod = await Admin.findById({ _id: id });
		const mod = await Admin.findOne({ _id: id, deleted_flag: false});
		if (!mod) {
			throw new HttpError('Moderator not found!', 404);
		}

		if (mod.role == 'admin') {
			throw new HttpError(`Can't delete admin account`, 401);
		}

		await Promise.all([Admin.findByIdAndUpdate({ _id: id }), UserPermission.deleteMany({ userId: mod._id })]);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

export const adminController = {
	login,
    createMod,
	getMods,
    deleteMod,
};