import { Company } from '../models';
export default class CompanyService {
	async getCompany(_id) {
		return await Company.findOne(
			{ accountId: _id },
			{
				__v: 0,
				createdAt: 0,
				updateAt: 0,
				role: 0,
				rate: 0,
			},
		);
	}

	async update(_id, data) {
		const company = await this.getCompany(_id);
		if (!company) {
			return false;
		} 

		await Company.findOneAndUpdate({ accountId: _id }, data);
		return true;
	}


}
