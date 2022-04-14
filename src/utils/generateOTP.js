const DIGITS = '0123456789';

export const generateOTP = () => {
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += DIGITS[Math.floor(Math.random() * DIGITS.length)];
	}
	return code;
};