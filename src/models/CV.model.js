import { Schema, model } from 'mongoose';

const CVSchema = new Schema(
	{
		iterId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		skill: [{ type: String, default: [] }],
		softSkill: {
			type: String,
		},
		birthday: {
			type: String,
		},
		experience: { type: String },
		description: {
			type: String,
		},

		image: {
			type: String,
		},
	},
	{ timestamps: true },
);

CVSchema.index({
	skill: 'text',
});
export const CV = model('cv', CVSchema, 'cv');
