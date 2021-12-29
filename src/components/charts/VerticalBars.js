import chartToPNG from "../../helpers/chartToPNG.mjs";

export default function (props) {
	let from = 35
	let retirementAge = 60
	let end = 85

	let RenderedChart = chartToPNG({
		options: {
			chart_type: "bar",
			title: 'Ending Balance and Average of Retirement Income Replacement by Age',
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
			yAxisTicksShowIfDivisableBy: 1000,
			yAxisTicksShowDecimals: 0,
			yAxisTicksShowSymbol: 'M',
			showLegend: true,
			legendMarginTop: 5, // Only works for top margin between title and legend
		},
		customer: props.customer,
	});
	// console.log('verticalBars RenderedChart')
	// console.log('verticalBars RenderedChart', RenderedChart)
	return (
		<div className={props.className} style={{maxWidth: '100%'}}>
			{/*<h4 className={'chart-title'}>Retirement Planning</h4>*/}
			<img  style={{width: '100%'}} src={`${RenderedChart.toString()}`} alt='Data Chart'/>
		</div>
	);
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
