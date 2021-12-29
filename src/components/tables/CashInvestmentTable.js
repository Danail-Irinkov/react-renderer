import Table from "../Table";

export default function (props) {

	let columns = [
		{
			name: "Investment Amount",
			selector: (row) => row.investment_amount,
		},
		{
			name: " Investment growth %",
			selector: (row) => row.investment_growth,
		},
		{
			name: "Bank interest",
			selector: (row) => row.bank_interest,
		},
		{
			name: "Investment FV",
			selector: (row) => row.investment_fv,
		},
		{
			name: "Bank deposit FV",
			selector: (row) => row.bank_deposit_fv,
		},
		{
			name: "Potential Loss",
			selector: (row) => row.potential_loss,
		},
	];
	let investment_amount = 224000
	let invest_interest = 0.05
	let bank_interest = 0.015
	let years = 10

	let first_row = {
		investment_amount: investment_amount,
		investment_growth: formatPercentage(invest_interest),
		bank_interest: formatPercentage(bank_interest),
		investment_fv: calcFV(investment_amount, invest_interest, years),
		bank_deposit_fv: calcFV(investment_amount, bank_interest, years),
	}
	first_row.potential_loss = '-'+formatUSDnumber(first_row.investment_fv - first_row.bank_deposit_fv)
	first_row.investment_amount = formatUSDnumber(first_row.investment_amount)
	first_row.investment_fv = formatUSDnumber(first_row.investment_fv)
	first_row.bank_deposit_fv = formatUSDnumber(first_row.bank_deposit_fv)

	let rows = [first_row]

	return (
		<div className={props.className}>
			<h3 className={'table-title'}>Future Value</h3>
			<p className={'table-description'}>
				At any point you can invest with us and earn
			</p>
			<Table columns={columns} rows={rows} className={'red-last-col'} />
		</div>
	);
}

function calcFV(amount, interest, years) {
	return amount*Math.pow(1 + interest, years)
}

function formatPercentage(number) {
	return (number*100).toFixed(2)+'%'
}
function formatUSDnumber(number) {
	return '$'+Math.round(number).toLocaleString()
}
