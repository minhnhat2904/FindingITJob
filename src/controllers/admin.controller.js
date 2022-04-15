import bcrypt from 'bcryptjs';
import { HttpError, tokenEncode } from '../utils';
import { Admin } from '../models';

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

export const adminController = {
	login,
};