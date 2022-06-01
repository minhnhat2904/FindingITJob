import { NotificationService } from '../services';

const notificationService = new NotificationService();

const notifications = async (req, res, next) => {
	try {
		const { page, take } = req.query;
		const data = await notificationService.getNotifications(req.user._id, page, take);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};
const numberOfNotifications = async (req, res, next) => {
	try {
		const numberOfNotifications = await notificationService.getNumberOfNotifications(req.user._id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			numberOfNotifications: numberOfNotifications,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const reset = async (req, res, next) => {
	try {
		await notificationService.reset(req.user._id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const notificationController = {
	notifications,
	numberOfNotifications,
	reset,
};
