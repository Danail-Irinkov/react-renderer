export default (customer, options, plugins= []) => {
	// console.log("generateChartData customer", customer);
	// console.log("generateChartData options", options);
	let chart_data = {};
	//TODO: some business logic to define chart data
	chart_data = {
		type: options.chart_type,
		data: options.data,
		devicePixelRatio: 2,
		options: {
			...options,
			responsive: false,
			animation: false,
			maintainAspectRatio: false,
			elements: options.elements || {},
			scales: {
				x: {
					beginAtZero: false,
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
					beginAtZero: false,
					ticks: {
						color: '#a4a4a4',
						font: {
							family: "'Didot', 'Playfair Display', 'Trebuchet MS', 'Helvetica Neue', 'Helvetica', sans-serif",
							size: 26,
							weight: '600'
						},
						// eslint-disable-next-line no-unused-vars
						callback: function(value, index, values) {
							let val = value
							if (options.yAxisTicksShowIfDivisableBy)
								val = value % 1000 === 0 ? String((value/options.yAxisTicksShowIfDivisableBy).toFixed(options.yAxisTicksShowDecimals || 0)): null;

							if (val && options.yAxisTicksShowSymbol)
								val = val + options.yAxisTicksShowSymbol

							return val
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
			plugins: {
				title: {
					display: !!options.title,
					align: 'start',
					text: options.title,
					font: {
						family: "'Trebuchet MS', 'Helvetica Neue', 'Helvetica', sans-serif",
						size: 30,
						weight: '600'
					},
					color: '#2a2928'
				},
				legend: {
					display: !!options.showLegend,
					align: 'center',
					labels: {
						color: '#8f8f8d',
						padding: 25,
						boxWidth: 20,
						textAlign: 'right',
						usePointStyle: true,
						pointStyle: 'border-radius: 100%;',
						font: {
							family: "'Didot', 'Playfair Display', 'Trebuchet MS', 'Helvetica Neue', 'Helvetica', sans-serif",
							size: 26,
							weight: '600'
						},
					},
				},
				...options.plugins
			},
		},
		plugins: [{
			id: 'legendMarginTop',
			// eslint-disable-next-line no-unused-vars
			beforeInit(chart, args, opts) {
				// console.log('chart.legend.fit', chart.legend)
				let fitValue = chart.legend.fit
				chart.legend.fit = function () {
					fitValue.bind(chart.legend)()
					if(options.showLegend)
						this.height += options.legendMarginTop || 15
					// console.log('inside FIT', this)
				}
			}
		},
		...plugins
		]
	};
	return chart_data;
};

