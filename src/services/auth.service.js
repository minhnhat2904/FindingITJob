import { Account } from '../models';

export default class AuthenticationService {
    async getAccount(email) {
        const account = await Account.findOne(email)
        return account;
    }
}