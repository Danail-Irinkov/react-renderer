import canvas from 'canvas'
import ChartJS from 'chart.js/auto';
import generateChartData from './generateChartData.js'

export default function(props) {
	const width = 1600;
	const height = 800;

	//Generate the chartJS input needed based on the customer data
	const opts = generateChartData(props.customer, {...props.options, width, height})

	const myCanvas = canvas.createCanvas(width, height);
	const ctx = myCanvas.getContext('2d');
	const myChart = new ChartJS(ctx, opts);

	if (!myChart.canvas) {
		return new Error('Canvas is null')
	}

	const dataUrl = myChart.canvas.toDataURL('image/png');
	myChart.destroy();

	return dataUrl
}

