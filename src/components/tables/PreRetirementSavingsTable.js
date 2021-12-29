import Table from "../Table";

export default function (props) {

	let columns = [
		{
			name: "Age",
			selector: (row) => row.age,
		},
		{
			name: "Annual Salary increasing @ 3% pa",
			selector: (row) => row.annual_salary,
		},
		{
			name: "Begining Retirement Balance",
			selector: (row) => row.beginning_balance,
		},
		{
			name: "5% earnings",
			selector: (row) => row.earnings,
		},
		{
			name: "Annual Savings",
			selector: (row) => row.annual_savings,
		},
		{
			name: "Ending Balance",
			selector: (row) => row.ending_balance,
		},
	];
	let first_row = {
		age: 35,
		annual_salary: 100000,
		beginning_balance: 101000,
		earnings: 5050,
		annual_savings: 56538,
		ending_balance: 162588,
	}

	let rows = generatePRTrows(first_row, 24)

	return (
		<div className={props.className}>
			<h3 className={'table-title'}>PRE RETIREMENT SAVINGS</h3>
			<p className={'table-description'}>
				During pre-retirement savings savings are contributed from your annual salary,
				while you earn a compounded return on the
				capital of your retirement balance.
			</p>
			<Table columns={columns} rows={rows} className={'small-first-col'}/>
		</div>
	);
}

function generatePRTrows(first_row, rows_amount) {
	let rows = [convertPRSTrowToStrings(first_row)]
	let salary_increase = 1.03
	let earnings_coef = first_row.earnings/first_row.beginning_balance
	let savings_coef = first_row.annual_savings/first_row.annual_salary

	let last_row = first_row
	for (let i = 0; i<rows_amount; i++) {
		let row = {
			age: last_row.age+1,
			annual_salary: last_row.annual_salary*salary_increase,
			beginning_balance: last_row.ending_balance,
			earnings: last_row.ending_balance*earnings_coef,
			annual_savings: last_row.annual_salary*salary_increase*savings_coef
		}
		row.ending_balance = row.beginning_balance + row.earnings + row.annual_savings

		last_row = row

		rows.push(convertPRSTrowToStrings(row))
	}
	return rows
}
function convertPRSTrowToStrings(row) {
	return {
		age: row.age,
		annual_salary: formatUSDnumber(row.annual_salary),
		beginning_balance: formatUSDnumber(row.beginning_balance),
		earnings: formatUSDnumber(row.earnings),
		annual_savings: formatUSDnumber(row.annual_savings),
		ending_balance: formatUSDnumber(row.ending_balance),
	}
}
function formatUSDnumber(number) {
	return '$'+Math.round(number).toLocaleString()
}
