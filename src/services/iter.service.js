import { ITer } from "../models";

export default class ITerService {
	async getIter(id) {
		return await ITer.findOne(
			{ accountId: id },
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
				role: 0,
				roleId: 0,
			},
		);
	}
}