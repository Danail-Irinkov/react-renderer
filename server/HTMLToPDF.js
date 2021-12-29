const pdf = require('html-pdf')
// const util = require('util')
const path = require('path')
const default_path = path.resolve('./temp/test.pdf')

module.exports = function (html, path = default_path) {
	try {
		const options = {
			format: 'A4',
			border: {
				top: '25px',
				bottom: '25px'
			},
			"footer": {
				"height": "48mm",
			},
		}
		console.log('path', path)
		return pdf.create(html, options).toFile(path, function(err, res) {
			if (err) return console.log('pdf.create err:', err)
			return res
		})
	} catch (err) {
		console.log('email', `${err}\n${(new Error()).stack}`)
		return Promise.reject(err)
	}
}
