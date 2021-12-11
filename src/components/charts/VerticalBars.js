import chartToPNG from "../../helpers/chartToPNG.mjs";

export default function (props) {
	let RenderedChart = chartToPNG({
		options: { chart_type: "bar" },
		customer: props.customer,
	});
	// console.log('verticalBars RenderedChart', RenderedChart)
	return (
		<div className={props.className}>
			<img src={`${RenderedChart.toString()}`} alt='Data Chart'/>
		</div>
	);
}
