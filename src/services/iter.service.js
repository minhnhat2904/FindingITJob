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

	async update(_id, data) {
		const iter = await this.getIter(_id);
		if (!iter) {
			return false;
		}
		await ITer.findOneAndUpdate({ accountId: _id }, data);
		return true;
	}
}