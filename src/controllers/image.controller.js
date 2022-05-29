import { signFileUploadRequest } from '../utils';


const uploadImageProfile = async (req, res, next) => {
	try {
		const payload = await signFileUploadRequest();
		res.status(200).json({
			status: 200,
			msg: 'Success',
			payload,
		});
	} catch (error) {
		next(error);
	}
};

export const imageController = {
	uploadImageProfile
};
