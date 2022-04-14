import { Account, Permission, UserPermission, ITer, Company } from '../models';
import bcrypt from 'bcryptjs';

export default class AuthenticationService {
    async getAccount(email) {
        const account = await Account.findOne({ email, deleted_flag: false })
        return account;
    }

    async register(data, role) {
        const hash = await bcrypt.hash(data.password, 10);
        let account = await Account.create({ email: data.email, password: hash, role });

        let permissions = await Permission.find({ role, check: true});
        permissions = permissions.map(permission => {
            return UserPermission.create({
                userId: account._id,
                permissionId: permission._id,
                permissionName: permission.permissionName,
                actionCode: permission.actionCode,
                check: true,
            });
        });

        if(role == 'iter') {
            await ITer.create({
                name: data.name,
                accountId: account._id,
                email: data.email,
            })
        }

        if(role == 'company') {
            await Company.create({
                name: data.name,
                accountId: account._id,
                email: data.email,
            })
        }

        await Promise.all([...permissions]);
    }

    async updatePassword(email, password, newPassword) {
        let user = await this.getAccount(email);
        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return false;
        }

        const hash = await bcrypt.hash(newPassword, 12);

        await Account.findOneAndUpdate(email, { password : hash }, { new: true });
        return true;
    }
}