import canvas from 'canvas'
import ChartJS from 'chart.js/auto';
import generateChartData from './generateChartData.js'

export default function(props) {
	const width = 1600;
	const height = 800;

	//Generate the chartJS input needed based on the customer data
	const opts = generateChartData(props.customer, {...props.options, width, height})

	//.... code that generates the chart to iamge/png

	return 'image/png...'
}

