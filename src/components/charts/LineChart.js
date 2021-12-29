import chartToPNG from "../../helpers/chartToPNG.mjs";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function (props) {
	let from = 0
	let end = 10

	let RenderedChart = chartToPNG({
		plugins: [ChartDataLabels],
		options: {
			chart_type: "line",
			// title: 'Cash Investment',
			title: 'Investment and Cash deposit Future Value Projection',
			data: {
				labels: generateAgeLabels(from, end),
				datasets: [
					{
						label: "Bank FV",
						data: generateBankFVData(from, end),
						fill: true,
						backgroundColor: 'rgba(237,122,35,0.4)',
						borderColor: '#ed7a23',
						// borderWidth: 1,
						// barPercentage: 0.5,
					},
					{
						label: "Inv FV",
						data: generateInvFVData(from, end),
						fill: true,
						backgroundColor: 'rgba(213,44,31,0.4)',
						borderColor: '#d52c1f',
						// borderWidth: 0,
						// barPercentage: 1.0,
					},
				],
			},
			elements: {
				point: {
					radius: 0
				}
			},
			plugins: {
				datalabels: {
					align: 'top',
					anchor: 'start',
					offset: 6,
					font: {
						family: "'Didot', 'Playfair Display', 'Trebuchet MS', 'Helvetica Neue', 'Helvetica', sans-serif",
						size: 18,
						weight: '600'
					},
					textShadowColor: 'white',
					textShadowBlur: 2,
					display: function(context) {
						let value = context.dataset.data[context.dataIndex]
						return !!value && context.dataIndex > 0 && !(context.dataIndex % 3); // display labels with an odd index
					},
					// eslint-disable-next-line no-unused-vars
					formatter: function(value, context) {
						return Math.round(value/1000) + 'K';
					}
				}
			},
			yAxisTicksShowIfDivisableBy: 1000,
			yAxisTicksShowDecimals: 0,
			yAxisTicksShowSymbol: 'K',
			showLegend: true,
			legendMarginTop: 25, // Only works for top margin between title and legend
		},
		customer: props.customer,
	});
	// console.log('LineChart RenderedChart')
	// console.log('LineChart RenderedChart', RenderedChart)
	return (
		<div className={props.className} style={{maxWidth: '100%'}}>
			{/*<h4 className={'chart-title'}>Cash Investment</h4>*/}
			<img  style={{width: '100%'}} src={`${RenderedChart.toString()}`} alt='Data Chart'/>
		</div>
	);
}


function generateAgeLabels(from, to) {
	let list = [];
	for (let i = from; i <= to; i++) {
		if (i % 2 === 0)
			list.push(i);
		else
			list.push('')
	}

	return list
}

function generateInvFVData(from, to, start = 224000, end = 580000) {
	let list = [];
	let coef = Math.pow((end/start), 1/(to-from+1));
	// let increment = (end-start)/(to-from+1)

	let value = start

	for (let i = from; i <= to; i++) {
		value = value*coef
		list.push(value);
	}
	return list
}
function generateBankFVData(from, to, start = 224000, end = 273000) {
	let list = [];
	let increment = (end-start)/(to-from+1)

	let value = start

	for (let i = from; i <= to; i++) {
		value += increment
		list.push(value);
	}
	return list
}
