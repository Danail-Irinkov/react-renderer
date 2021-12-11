export default (customer, options) => {
	console.log("generateChartData customer", customer);
	console.log("generateChartData options", options);
	let chart_data = {};
	//TODO: some business logic to define chart data
	chart_data = {
		type: options.chart_type,
		data: {
			labels: [
				"Red",
				"Blue",
				"Yellow",
				"Green",
				"Purple",
				"Orange",
				"Blue",
				"Yellow",
				"Green",
				"Purple",
				"Orange",
				"Blue",
				"Yellow",
				"Green",
				"Purple",
				"Orange",
				"Blue",
				"Yellow",
				"Green",
				"Purple",
				"Orange",
			],
			datasets: [
				{
					label: "# of Votes",
					data: [
						12, 19, 3, 5, 2, 3, 13, 23, 15, 22, 33, 19, 3, 5, 2, 3, 13, 23, 15,
						22, 33,
					],
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255,99,132,1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: false,
			animation: false,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			// scales: {
			// 	myScale: {
			// 		type: 'logarithmic',
			// 		position: 'right', // `axis` is determined by the position as `'y'`
			// 	},
			// yAxes: [{
			// 	ticks: {
			// 		beginAtZero: true
			// 	}
			// }]
			// }
		},
		// plugins: [{
		// 	id: 'background-colour',
		// 	beforeDraw: (chart) => {
		// 		const ctx = chart.ctx;
		// 		ctx.save();
		// 		ctx.fillStyle = 'white';
		// 		ctx.fillRect(0, 0, options.width, options.height);
		// 		ctx.restore();
		// 	}
		// }]
	};
	return chart_data;
};
