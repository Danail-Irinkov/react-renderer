import Table from "../Table";

export default function (props) {

	let columns = [
		{
			name: "Age",
			selector: (row) => row.age,
		},
		{
			name: "Begining Retirement Balance",
			selector: (row) => row.beginning_balance,
		},
		{
			name: "Earnings Post Retirement",
			selector: (row) => row.earnings_post_retirement,
		},
		{
			name: "Retirement Income Replacement",
			selector: (row) => row.retirement_income_replacement,
		},
		{
			name: "Ending Balance",
			selector: (row) => row.ending_balance,
		},
	];
	let first_row = {
		age: 60,
		beginning_balance: 3995992,
		earnings_post_retirement: 199800,
		retirement_income_replacement: 209378,
		ending_balance: 3986413,
	}

	let rows = generatePRTrows(first_row, 24)

	return (
		<div className={props.className}>
			<h3 className={'table-title'}>POST RETIREMENT INCOME REPLACEMENT</h3>
			<p className={'table-description'}>
				During post-retirement savings decrease by Retirement income replacement, while you earn a compounded return on the capital
				of your retirement balance.
			</p>
			<Table columns={columns} rows={rows} className={'small-first-col'}/>
		</div>
	);
}

function generatePRTrows(first_row, rows_amount) {
	let rows = [convertPRSTrowToStrings(first_row)]

	let earnings_coef = 0.05
	let retirement_income_coef = 1.03

	let last_row = first_row
	for (let i = 0; i<rows_amount; i++) {
		let row = {
			age: last_row.age+1,
			beginning_balance: last_row.ending_balance,
			earnings_post_retirement: last_row.ending_balance*earnings_coef,
			retirement_income_replacement: last_row.retirement_income_replacement*retirement_income_coef
		}
		row.ending_balance = row.beginning_balance + row.earnings_post_retirement - row.retirement_income_replacement

		last_row = row

		rows.push(convertPRSTrowToStrings(row))
	}
	return rows
}
function convertPRSTrowToStrings(row) {
	return {
		age: row.age,
		beginning_balance: formatUSDnumber(row.beginning_balance),
		earnings_post_retirement: formatUSDnumber(row.earnings_post_retirement),
		retirement_income_replacement: formatUSDnumber(row.retirement_income_replacement),
		ending_balance: formatUSDnumber(row.ending_balance),
	}
}
function formatUSDnumber(number) {
	return '$'+Math.round(number).toLocaleString()
}
