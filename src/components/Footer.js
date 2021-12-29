import logo from "../assets/logos/tallrock-t-small.png";

export default function Footer() {
	return (
		<div className="footer text-black font-bold xl:rounded-b-lg xl:border xl:shadow-lg p-4 m-0 w-full"
			id="pageFooter-last">
			<div className={"container"}>
				{/*<Logo className={"px-4 w-80"} />*/}
				<img src={logo} className={"h-32 px-4 w-auto"}/>
			</div>
			<div className={"py-2 px-4 w-full"}>
        Webpack 5 + React HTML -`&gt; PDF renderer
			</div>
		</div>
	);
}
