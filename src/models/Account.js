import { Schema, model } from 'mongoose';

const AccountSchema = new Schema (
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        deleted_flag: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true },
);

export const Account = model("account", AccountSchema, "account");
