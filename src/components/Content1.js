import VerticalBars from "./charts/VerticalBars";
import LineChart from "./charts/LineChart";
import PreRetirementSavingsTable from "./tables/PreRetirementSavingsTable";
import PostRetirementIncomeTable from "./tables/PostRetirementIncomeTable";
import CashInvestmentTable from "./tables/CashInvestmentTable";

export default function Content1(props) {
	return (
		<div className="content flex flex-col text-black font-bold rounded-none xl:border xl:shadow-lg p-8 m-0 w-full h-fit">
			<div className={'mt-4'}>
				<h4>Retirement Planning</h4>
				<p>
	        Lorem Ipsum is simply dummy text of the printing and typesetting
	        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
	        ever since the 1500s, when an unknown printer took a galley of type and
	        scrambled it to make a type specimen book.
				</p>
			</div>
			<VerticalBars
				customer={props.customer}
				className="content flex flex-col mb-12 mt-8 mx-auto"
			/>
			<PreRetirementSavingsTable className="mt-10 page-break-inside-avoid" />
			<div className={'page-break-before'}>
				<h4 className="mt-8">Post Retirement Insurance</h4>
				<p>
	        Lorem Ipsum is simply dummy text of the printing and typesetting
	        industry.
				</p>
				<PostRetirementIncomeTable className="my-6 page-break-inside-avoid" />
			</div>

			<div className={'page-break-inside-avoid page-break-before'}>
				<h4>Cash Investment Intro</h4>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry&apos;s standard dummy text
					ever since the 1500s
				</p>
				<LineChart
					customer={props.customer}
					className="content flex flex-col mb-12 mt-4 mx-auto"
				/>
				<CashInvestmentTable />
			</div>
			<div className={'page-break-inside-avoid mt-8'}>
				<h4>Insurance Outro</h4>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry&apos;s standard dummy text
					ever since the 1500s
				</p>
			</div>
		</div>
	);
}
