import { Schema, model } from "mongoose";
const userPermissionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        permissionId: {
            type: Schema.Types.ObjectId,
            ref: "permission",
        },
        permissionName: {
            type: String,
        },
        actionCode: {
            type: String,
        },
        check: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const UserPermission = model("userPermission", userPermissionSchema, "userPermission");