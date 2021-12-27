export default (customer, options) => {
	console.log("generateChartData customer", customer);
	console.log("generateChartData options", options);
	let chart_data = {};
	//TODO: some business logic to define chart data
	let from = 35
	let retirementAge = 60
	let end = 85
	chart_data = {
		type: options.chart_type,
		data: {
			labels: generateAgeLabels(from, end),
			datasets: [
				{
					label: "Ending Balance",
					data: generateEndingBalanceData(from, retirementAge,end),
					backgroundColor: '#666666',
					borderColor: '#666666',
					borderWidth: 0,
					barPercentage: 1.0,
				},
				{
					label: "Average of Retirement Income Replacement",
					data: generateARIRData(from, end),
					backgroundColor: '#c69113',
					borderColor: '#c69113',
					borderWidth: 0,
					barPercentage: 1.0,
				},
			],
		},
		options: {
			responsive: false,
			animation: false,
			maintainAspectRatio: false,
			scales: {
				x: {
					beginAtZero: true,
					ticks: {
						color: '#a4a4a4',
						backdropPadding: 0,
						maxRotation: 0,
						autoSkip: false,
						major: false,
						font: {
							family: "'Didot', 'Playfair Display', 'Trebuchet MS', 'Helvetica Neue', 'Helvetica', sans-serif",
							size: 26,
							weight: '600'
						},
						// // eslint-disable-next-line no-unused-vars
						// callback: function(value, index, values) {
						// 	//console.log('values[index]', values[index])
						// 	return value
						// 	// return value % 10 === 0 ? value : ''
						// }
					},
					grid: {
						display: false,
						borderWidth: 0
					}
				},
				y: {
					beginAtZero: true,
					ticks: {
						color: '#a4a4a4',
						font: {
							family: "'Didot', 'Playfair Display', 'Trebuchet MS', 'Helvetica Neue', 'Helvetica', sans-serif",
							size: 26,
							weight: '600'
						},
						// eslint-disable-next-line no-unused-vars
						callback: function(value, index, values) {
							return value % 1000 === 0 ? ''+value/1000+'M': null;
						}
					},
					grid: {
						borderColor: '#a4a4a4',
						borderWidth: 0,
						borderDash: [3, 8],
						tickWidth: 0,
						lineWidth: 3,
						// circular: true
					}
				},
			},
			...options
		},
		plugins: [legendMargin]
	};
	return chart_data;
};

const legendMargin = {
	id: 'legendMargin',
	// eslint-disable-next-line no-unused-vars
	beforeInit(chart, args, options) {
		// console.log('chart.legend.fit', chart.legend)
		let fitValue = chart.legend.fit
		chart.legend.fit = function () {
			fitValue.bind(chart.legend)()
			this.height += 5
			// console.log('inside FIT', this)
		}
	}
}

function generateAgeLabels(from, to) {
	let list = [];
	for (let i = from; i <= to; i++) {
		if (i % 10 === 0)
			list.push(i);
		else
			list.push('')
	}

	return list
}

function generateEndingBalanceData(from, mid, end, start = 100, max = 4000, finish = 0) {
	let list = [];
	let increment = (max-start)/(mid-from)
	// let decrement = (max-end)
	let decrement = (max-finish)/(end-mid)
	// let decrement = (max-end)/(end-61)

	let value = start

	for (let i = from; i <= end; i++) {
		if(i<=mid)
			value += Math.pow(increment*(1-(end-i)/(end-from)), 1.28)*((end-i)/(end-mid))*((end-mid)/(mid-from))
		else
			value -= Math.pow(decrement*(1-(end-i)/(end-from)), 1.167)*(1-(end-i)/(end-mid))*((end-mid)/(mid-from))
			// value -= Math.pow(i-mid, 2)*(1-(end-i)/end)*0.805
			// value -= hyperbola(i, end) * decrement*1.7*(end/i) // Math.pow(decrement, 2)

		list.push(value);
	}
	return list
}
function generateARIRData(from, to, start = 0, mid = 150, end = 500) {
	let list = [];
	let increment = (end-mid)/(to-60)

	let value = start

	for (let i = from; i <= to; i++) {
		if(i<60)
			value += 0
		else if(i===60)
			value += mid
		else
			value += increment

		list.push(value);
	}
	return list
}
