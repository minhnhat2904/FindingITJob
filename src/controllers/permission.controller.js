import mongo from "mongoose";
import { PermissionService } from "../services";
const permissionService = new PermissionService();

const getPermissions = async (req, res, next) => {
    const role = req.query.role || "";
    try {
        let permissions = await permissionService.getPermissions(role);
        res.status(200).json({
            status: 200,
            msg: "Success",
            permissions,
        });
    } catch (error) {
        next(error);
    }
};

const getUserPermission = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongo.Types.ObjectId.isValid(id)) {
            throw new HttpError("id is not found", 400);
        }
        const permissions = await permissionService.getUserPermission(id);
        res.status(200).json({
            status: 200,
            msg: "Success",
            permissions,
        });
    } catch (error) {
        next(error);
    }
};

export const permissionController = {
    getPermissions,
    getUserPermission
};
