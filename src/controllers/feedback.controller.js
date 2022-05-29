import { Feedback } from '../models';

const getFeedbacks = async (req, res, next) => {
	try {
		const feedbacks = await Feedback.find({}, { updatedAt: 0, __v: 0 });
		res.status(200).json({
			status: 200,
			msg: 'Success',
			feedbacks,
		});
	} catch (error) {
		next(error);
	}
};

const createFeedback = async (req, res, next) => {
	const { _id } = req.user;
	const { content } = req.body;
	try {
		await Feedback.create({ userId: _id, content });
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};


const deleteFeedback = async (req, res, next) => {
	const { feedbackId } = req.params;
	try {
		const deleted = await Feedback.findByIdAndDelete(feedbackId);
		if (!deleted) {
			throw new HttpError('Delete Feedback failed', 400);
		}
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

export const feedbackController = {
	getFeedbacks,
	createFeedback,
	deleteFeedback,
};