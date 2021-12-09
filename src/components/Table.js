import DataTable from 'react-data-table-component';

let columns = [
	{
		name: 'Title',
		selector: row => row.title,
	},
	{
		name: 'Year',
		selector: row => row.year,
	},
];

let data = [
	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]

export default function Table(props) {
	if(props?.data)	data = props.data
	if(props?.columns) data = props.columns

	return (
		<DataTable
			columns={columns}
			data={data}
		/>
	)
}
