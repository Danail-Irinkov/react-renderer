import DataTable from "react-data-table-component";

let columns = [
	{
		name: "Age",
		selector: (row) => row.age,
	},
	{
		name: "Title",
		selector: (row) => row.title,
	},
	{
		name: "Year",
		selector: (row) => row.year,
	},
	{
		name: "GPR",
		selector: (row) => row.gpr,
	},
	{
		name: "Total",
		selector: (row) => row.total,
	},
];

let rows = [
	{
		age: 34,
		title: "Beetlejuice",
		year: "1988",
		gpr: "22%",
		total: "23M",
	},
	{
		age: 45,
		title: "Ghostbusters",
		year: "1984",
		gpr: "18%",
		total: "8M",
	},
	{
		age: 56,
		title: "Starships",
		year: "1992",
		gpr: "33%",
		total: "48M",
	},
	{
		age: 47,
		title: "Galaxy 2230",
		year: "1998",
		gpr: "23%",
		total: "32M",
	},
];

export default function Table(props) {
	// eslint-disable-next-line react/prop-types
	if (props?.rows) rows = props.rows;
	// eslint-disable-next-line react/prop-types
	if (props?.columns) rows = props.columns;

	return (
		<div {...props} className={props.className+" table-wrapper"}>
			<DataTable columns={columns} data={rows} />
		</div>
	);
}
