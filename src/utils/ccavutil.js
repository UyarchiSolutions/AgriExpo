var crypto = require('crypto');
// exports.encrypt = function (plainText, workingKey) {
// 	// var m = crypto.createHash('sha256');
// 	// console.log(m)
// 	// m.update(workingKey);
// 	// // var key = m.digest('binary');
// 	// console.log(key)
// 	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
// 	// console.log(iv)
// 	let key = crypto.createHash('sha256').update(String(workingKey)).digest('base64')
// 	const key_in_bytes = Buffer.from(key, 'base64');
// 	var cipher = crypto.createCipheriv('aes-256-cbc', key_in_bytes, iv);
// 	console.log(cipher)
// 	var encoded = cipher.update(plainText, 'utf8', 'hex');
// 	encoded += cipher.final('hex');
// 	return encoded;
// // 	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
// //   let encrypted = cipher.update(text, 'utf-8', 'hex');
// //   encrypted += cipher.final('hex');
// //   return encrypted;

// };
exports.encrypt = function (plainText, workingKey) {
	console.log(workingKey)
	const hash = crypto.createHash('md5').update(workingKey).digest();
	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
	var cipher = crypto.createCipheriv('aes-128-cbc', hash, iv);
	var encoded = cipher.update(plainText, 'utf8', 'hex');
	encoded += cipher.final('hex');
	console.log(encoded)
	return encoded;
};


exports.decrypt = function (encText, workingKey) {
	var m = crypto.createHash('md5');
	m.update(workingKey)

	var key = m.digest('binary');
	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
	var decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
	var decoded = decipher.update(encText, 'hex', 'utf8');
	decoded += decipher.final('utf8');
	return decoded;
};

