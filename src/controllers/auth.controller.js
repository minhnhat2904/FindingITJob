import { AuthThenticationService } from '../services';
import { HttpError, tokenEncode } from '../utils';
import bcrypt from 'bcryptjs';

const authService = new AuthThenticationService();

const login = async (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    try {
        const user = await authService.getAccount({ email });
        if(!user) {
            throw new HttpError('Email have not already registered', 400);
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            throw new HttpError('Password is uncorrect', 400);
        }

        /**
         * Process user is ITer or Company. Feature will be develop after login success.
         */

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
            user: user,
        })
    } catch (error) {
        next(error);
    }
}

const authController={
    login
}

export default authController;