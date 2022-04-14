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
}
