import { UserPermission } from '../models';
/* check role and permission of role*/
export const checkRoleAndPermision = async (userId, actionCode) => {
	try {
		const userPermission = await UserPermission.findOne({
			userId,
			actionCode,
			check: true,
		});
		if (!userPermission) {
			return false;
		}
		return true;
	} catch (error) {
		return false;
	}
};