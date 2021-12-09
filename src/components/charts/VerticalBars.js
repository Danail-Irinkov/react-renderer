import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import chartToSVG from '../../helpers/chartToSVG.mjs';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options_default = {
	responsive: false,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data_mock = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Dataset 2',
			data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

export default function (props) {
	let data = data_mock
	let options = options_default
	if(props?.data?.datasets) data = props.data
	if(props?.options?.plugins) options = props.options

	console.log('verticalBars Data', data)
	console.log('verticalBars options', options)
	let RenderedChart = chartToSVG(data)
	// console.log('verticalBars RenderedChart', RenderedChart)
	return (
		<div className={props.className}>
			<img src={`data:image/png;base64,${RenderedChart.toString()}`} />
			<Bar width={800} height={400} id="barChart" options={options} data={data} />
		</div>
	)
}
