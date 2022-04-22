import { CompanyService } from '../services';
const companyService = new CompanyService();
import { followerService } from '../services';

const follow = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { companyId } = req.body;

		const company = await companyService.getCompany(companyId);
		if (!company) {
			throw new Error('Company not found', 400);
		}
		const follow = await followerService.follow(_id, companyId);
		res.status(200).json({
			status: 200,
			msg: `You have ${follow ? 'follow' : 'unfollow'} successfully `,
		});
	} catch (error) {
		next(error);
	}
};

export const followController = {
	follow,
};