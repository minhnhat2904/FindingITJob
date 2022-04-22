import { Permission, Admin, UserPermission } from '../models';
import fs from 'fs';
import log from 'datalog';
import { envVariables } from '../configs';
import bcrypt from 'bcryptjs';
import path from 'path';
import csv from 'csv-parser';

export const initAccountAdmin = async () => {
    try {
        const count = await Permission.countDocuments();
        if (count == 0) {
            await initPermission();
        } else {
            log.info('Permissions are already');
        }

        let admin = await Admin.findOne({ username: envVariables.usernameAdmin});
        if (admin) {
            log.info('Account admin is already');
            return;
        }

        const password = envVariables.passwordAdmin;
        const hash = await bcrypt.hash(password, 12);
        admin = await Admin.create({
            username: envVariables.usernameAdmin,
            password: hash,
            role: 'admin',
        })

        let permissions = await Permission.find({ role: 'admin', check : true});
        permissions = permissions.map((permission) => {
			return UserPermission.create({
				userId: admin._id,
				permissionId: permission._id,
				permissionName: permission.permissionName,
				actionCode: permission.actionCode,
				check: true,
			});
		});
		await Promise.all(permissions);
		log.info(`Account admin has been created.`);
    } catch (error) {
        log.error(error);
    }
}

const initPermission = async () => {
    try {
        let filePath = '../resources/csv/permission.csv';
        filePath = path.resolve(__dirname, filePath);
        if(!fs.existsSync(filePath)) {
            log.warn('File do not exist!');
            return;
        }
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                log.info('read file csv success');
                const permissions = results.map(permission => {
                    permission.check = parseInt(permission.check);
                    console.log(permission);
                    Permission.create(permission);
                })
                await Promise.all(permissions);
                log.info(`Create ${permissions.length} permission success`);
            })
    } catch (error) {
        log.error(error);
    }
}