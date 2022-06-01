import { Permission, UserPermission, Account } from '../models';
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

	async updatePermisson(permissions, role, apply) {
		let updatePer = permissions.map((permission) => {
			return Permission.findOneAndUpdate(
				{ _id: permission._id, check: !permission.check },
				{ check: permission.check },
			);
		});
		const [...changed] = await Promise.all(updatePer);
		let usersRole = [];
		if (role != 'moderator') {
			usersRole = await Account.find({ role }, { password: 0 });
		} else {
			usersRole = await Admin.find({ role }, { password: 0 });
		}
		// no apply
		if (apply === false) {
			let addUserPers = [];
			for (let item of changed) {
				if (item) {
					if (item.check == false) {
						// false => true
						// add permission
						let addUserPer = usersRole.map((e) => {
							return UserPermission.create({
								userId: e._id,
								perId: item._id,
								perName: item.perName,
								actionCode: item.actionCode,
								check: false, // no apply
							});
						});
						addUserPers = [...addUserPers, ...addUserPer];
					} else {
						// remove permission
						// xoa user per neu false. true => false
						let userPerDels = await UserPermission.find(
							{
								perId: item._id,
							},
							{ _id: 1 },
						);
						userPerDels = userPerDels.map((e) => UserPermission.findByIdAndDelete({ _id: e._id }));
						addUserPers = [...addUserPers, ...userPerDels];
					}
				}
			}
			await Promise.all(addUserPers);
		} else {
			let addUserPers = [];
			for (let item of changed) {
				if (item) {
					if (item.check == false) {
						// false => true
						// add permission
						let addUserPer = usersRole.map((e) => {
							return UserPermission.create({
								userId: e._id,
								permissionId: item._id,
								permissionName: item.permissionName,
								actionCode: item.actionCode,
								check: true, // no apply
							});
						});
						addUserPers = [...addUserPers, ...addUserPer];
					} else {
						// remove permission
						// xoa user per neu false. true => false
						let userPerDels = await UserPermission.find(
							{
								permissionId: item._id,
							},
							{ _id: 1 },
						);
						userPerDels = userPerDels.map((e) => UserPermission.findByIdAndDelete({ _id: e._id }));
						addUserPers = [...addUserPers, ...userPerDels];
					}
				}
			}
			await Promise.all(addUserPers);
		}
	}

	async updateUserPermisson(userId, permissions) {
		const newPermission = permissions.map((permission) => {
			return UserPermission.findOneAndUpdate({ userId, permissionId: permission._id, check: !permission.check }, { check: permission.check });
		});
		await Promise.all(newPermission);
	}
}
