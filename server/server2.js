import http from 'http'
import path from 'path'

import * as reactPDF from '@react-pdf/renderer'
import reactPDFApp from '../react-pdf/App.js'

let props = {
	template: 'Insurance1',
	cover: 'mothers',
	data: {
		perMonth: 1000,
		years: 10,
		interest: 0.05
	},
	state: {
		perMonth: 1000,
		years: 10,
		interest: 0.05
	}
}

http.createServer(async function(req, res) {
	if (req.url === '/') {
		let html = await reactPDF.renderToString(reactPDFApp(props))

		//Rendering to File
		// console.log('reactPDF path', `${path.resolve()}/temp/example.pdf`)
		// await reactPDF.render(reactPDFApp(), `${path.resolve()}/temp/example.pdf`)
		// console.log('reactPDF html', html)

		res.end(html)
	}
	else {
		res.statusCode = 404
		res.end()
	}

// The http server listens on port 3000
}).listen(4000, function(err) {
	if (err) throw err
	console.log('Listening on http://localhost:4000')
})

