import { CV } from '../models';
import _ from 'lodash';

export default class CVService {
	async create(data) {
		await CV.create(data);
	}
}
