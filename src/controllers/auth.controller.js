import { AuthThenticationService } from '../services';
import { HttpError, tokenEncode } from '../utils';
import bcrypt from 'bcryptjs';
import { Company, ITer } from '../models';

const authService = new AuthThenticationService();

const login = async (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    try {
        const user = await authService.getAccount(email);
        if(!user) {
            throw new HttpError('Email have not already registered', 400);
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            throw new HttpError('Password is uncorrect', 400);
        }

        const role = user.role;
        let accountId = user._id;
        let name;
        let image;

        if (role == 'iter') {
            const info = await ITer.findOne({ accountId });
            name = info.name;
            image = info.image;
        } else if (role == 'company') {
            const info = await Company.findOne({ accountId });
            name = info.name;
            image = info.image;
        }

        let data = {
            email: user.email,
            _id: user._id,
            role: user.role,
        };

        const token = tokenEncode(data);

        res.status(200).json({
            status: 200,
            msg: "Success",
            token,
            user: {
                role: data.role,
                name,
                image,
                userId: user._id,
            },
        })
    } catch (error) {
        next(error);
    }
}

const registerITer = async (req, res, next) => {
    let { email } = req.body;
    email = email.toLowerCase();

    try {
        const user = await authService.getAccount(email);
        if (user) {
            throw new HttpError('The email is existed', 400);
        }

        await authService.register(req.body, 'iter');

        res.status(200).json({
            status: 200,
            msg: 'Register success',
        })
    } catch (error) {
        next(error);
    }
}

const registerCompany = async (req, res, next) => {
    let { email } = req.body;
    email = email.toLowerCase();

    try {
        const user = await authService.getAccount(email);
        if (user) {
            throw new HttpError('The email is existed', 400);
        }

        await authService.register(req.body, 'company');

        res.status(200).json({
            status: 200,
            msg: 'Register success',
        })
    } catch (error) {
        next(error);
    }
}

const authController={
    login,
    registerITer,
    registerCompany
}

export default authController;