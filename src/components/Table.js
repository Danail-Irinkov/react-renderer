import DataTable from "react-data-table-component";

let columns = [
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
		id: 1,
		title: "Beetlejuice",
		year: "1988",
		gpr: "22%",
		total: "23M",
	},
	{
		id: 2,
		title: "Ghostbusters",
		year: "1984",
		gpr: "18%",
		total: "8M",
	},
	{
		id: 3,
		title: "Starships",
		year: "1992",
		gpr: "33%",
		total: "48M",
	},
];

export default function Table(props) {
	// eslint-disable-next-line react/prop-types
	if (props?.rows) rows = props.rows;
	// eslint-disable-next-line react/prop-types
	if (props?.columns) rows = props.columns;

	return (
		<div {...props}>
			<DataTable columns={columns} data={rows} />
		</div>
	);
}
