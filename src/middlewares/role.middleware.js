import { HttpError, checkRoleAndPermision } from "../utils";

const checkPermission = (permissionCode) => async (req, res, next) => {
    const { _id } = req.user;
    try {
		const hasPermission = await checkRoleAndPermision(_id, permissionCode);
        if (!hasPermission) {
            throw new HttpError("Deny permission", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const roleMiddleware = {
    checkPermission,
};