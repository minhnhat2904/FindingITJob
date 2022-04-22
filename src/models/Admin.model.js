import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: "admin",
        },
        deleted_flag: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export const Admin = model("admin", AdminSchema, "admin");