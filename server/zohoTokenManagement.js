const fs = require('fs');
let path = require('path');
let file_persistence = {};
file_persistence.updateOAuthTokens = function (tokenObject) {
	// eslint-disable-next-line no-unused-vars
	return new Promise(function (resolve, reject) {
		let tokens = {}
		console.log('updateOAuthTokens PATH! : ', path.dirname(require.main.filename) + '/zoho_sdk_tokens.txt')
		if (fs.existsSync(path.dirname(require.main.filename) + '/zoho_sdk_tokens.txt')) {
			let token_as_string = fs.readFileSync(path.dirname(require.main.filename) + '/zoho_sdk_tokens.txt', 'utf8');
			tokens = JSON.parse(token_as_string);

			for (let token in tokens.tokens) {
				if (String(tokens.tokens[token].user_identifier) === String(tokenObject.user_identifier))
					tokens.tokens.splice(token)

			}
			tokens.tokens.push(tokenObject);
		}
		else
			tokens.tokens = [tokenObject]

		let token_as_string = JSON.stringify(tokens);

		fs.writeFile(path.dirname(require.main.filename) + '/zoho_sdk_tokens.txt', token_as_string, function (err) {
			if (err) throw err;
			resolve();
		});
	})
}

file_persistence.getOAuthTokens = function (user_identifier) {
	// eslint-disable-next-line no-unused-vars
	return new Promise(function (resolve, reject) {
		let found = 0;

		if (fs.existsSync(path.dirname(require.main.filename) + '/zoho_sdk_tokens.txt')) {
			let token_as_string = fs.readFileSync(path.dirname(require.main.filename) + '/zoho_sdk_tokens.txt', 'utf8');
			let tokens = JSON.parse(token_as_string);

			for (let token in tokens.tokens) {
				if (tokens.tokens[token].user_identifier === user_identifier) {
					found = 1;
					resolve(tokens.tokens[token]);
				}
			}

			if (!found)
				resolve();

		}
	})
}


file_persistence.saveOAuthTokens = function (tokenobject) {
	// eslint-disable-next-line no-unused-vars
	return new Promise(function (resolve, reject) {
		file_persistence.updateOAuthTokens(tokenobject).then(function () {
			resolve();
		})
	})
}

module.exports = file_persistence;
