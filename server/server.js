const http = require('http')
const path = require('path')
const { createBundleRenderer } = require('react-server-renderer')
const serverBundle = require('../dist/react-ssr-server-bundle.json')
// const clientManifest = require('../dist/react-ssr-client-manifest.json')
const template = require('fs').readFileSync('./public/index.html', 'utf-8')
const HTMLToPDF = require('./HTMLToPDF.js')
// const zoho = require('./zoho.js')

http.createServer(async function(req, res) {
	if (req.url === '/') {

		res.setHeader('Content-Type', 'text/html; charset=utf-8')

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

		try {
			console.log('renderer 1: ', path.resolve('dist/static'))
			const renderer = createBundleRenderer(serverBundle,
				{
					template,
					// clientManifest,
					basedir: path.resolve('dist/static'),
					runInNewContext: false,
				})

			// console.log('renderer 2: ', renderer)
			// console.log('renderer serverBundle: ', serverBundle)
			// console.log('renderer template: ', template)
			// console.log('renderer clientManifest: ', clientManifest)
			let html = await renderer.renderToString({props})
			// console.log('renderer html: ', html)
			const pdf_path = path.resolve('./temp/test.pdf')
			await HTMLToPDF(html, pdf_path)

			res.end(html)
		}catch (e) {
			console.log('renderer err: ', e)
			res.statusCode = 502
			res.end()
		}
	}	else {
		res.statusCode = 404
		res.end()
	}

// The http server listens on port 3000
}).listen(4000, function(err) {
	if (err) throw err
	console.log('Listening on http://localhost:4000')
})

