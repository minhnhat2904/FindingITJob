import { AnalysisService } from '../services';
const analysisService = new AnalysisService();


const analysisOfPost = async (req, res, next) => {
	const { year } = req.query;
	try {
		const data = await analysisService.post(year);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};


const analysisOfSkill = async (req, res, next) => {
	const { option, year, month } = req.query;
	try {
		let data = [];
		if (option == 'month') data = await analysisService.skillForMonth(month, year);
		else if (option == 'year') data = await analysisService.skillForYear(year);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

const analysisUser = async (req, res, next) => {
	try {
		const data = await analysisService.analysisUser();
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};


export const analysisController = {
	analysisOfPost,
	analysisOfSkill,
	analysisUser,
};
