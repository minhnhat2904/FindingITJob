import { CV } from '../models';
import _ from 'lodash';
import ITerService from './iter.service';

const iterService = new ITerService();

export default class CVService {
	async create(data) {
		await CV.create(data);
	}

	async getCvByUser(iterId) {
		let [iter, cv] = await Promise.all([
			iterService.getIter(iterId),
			CV.findOne({ iterId }, { createdAt: 0, updatedAt: 0, __v: 0 }),
		]);
		if (!cv) {
			return null;
		}
		return { ...JSON.parse(JSON.stringify(cv)), receiveMail: _.get(iter, 'receiveMail') };
	}

	async getCv(_id) {
		return await CV.findById({ _id }, { createdAt: 0, updatedAt: 0, __v: 0 });
	}
}
