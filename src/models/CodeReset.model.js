import { Schema, model } from 'mongoose';

const CodeResetSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		accountId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
		},
		email: {
			type: String,
			required: true,
		},

		expireAt: {
			type: Date,
			default: Date.now,
			createIndexes: { expires: '5m' },
		},
	},
	{ timestamps: true },
);

export const CodeReset = model('codeReset', CodeResetSchema, 'codeReset');
