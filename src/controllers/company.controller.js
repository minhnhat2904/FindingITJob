import mongo from 'mongoose';
import { HttpError } from '../utils';
import { CompanyService } from '../services';
const companyService = new CompanyService();

const getCompanies = async (req, res, next) => {
	const { take, page } = req.query;

	try {
		const data = await companyService.getCompanies(page, take);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

const deleteCompany = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(id)) {
            throw new HttpError('Id incorrect', 401);
        }
		if (!(await companyService.deleteCompany(id))) {
            throw new HttpError('Company not found', 400);
        } 
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

const getCompaniesInfo = async (req, res, next) => {
	const { take, page, query } = req.query;
	try {
		const data = await companyService.getInfoCompanies(page, take, query);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const companyController = {
	getCompanies,
	deleteCompany,
	getCompaniesInfo,
};
