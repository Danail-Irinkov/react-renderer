import chartToPNG from "../../helpers/chartToPNG.mjs";

export default function (props) {
	let RenderedChart = chartToPNG({
		options: {
			chart_type: "bar",
			plugins: {
				title: {
					display: true,
					align: 'start',
					// text: 'Retirement Planning',
					text: 'Ending Balance and Average of Retirement Income Replacement by Age',
					font: {
						family: "'Trebuchet MS', 'Helvetica Neue', 'Helvetica', sans-serif",
						size: 36,
						weight: '600'
					},
					color: '#2a2928'
				},
				legend: {
					display: true,
					align: 'start',
					labels: {
						color: '#8f8f8d',
						padding: 15,
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
				}
			}
		},
		customer: props.customer,
	});
	console.log('verticalBars RenderedChart')
	// console.log('verticalBars RenderedChart', RenderedChart)
	return (
		<div className={props.className} style={{maxWidth: '100%'}}>
			<img  style={{width: '100%'}} src={`${RenderedChart.toString()}`} alt='Data Chart'/>
		</div>
	);
}
