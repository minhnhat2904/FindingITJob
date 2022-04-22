import { Permission, UserPermission } from '../models';
import _ from 'lodash';


export default class PermissionService {
	async getPermissions(role) {
		if (!role) {
            return await Permission.find();
        }
		else {
            return await Permission.find({ role })
        };
	}

    async getUserPermission(userId) {
		return await UserPermission.find({ userId }, { createdAt: 0, __v: 0, updatedAt: 0 });
	}
}
