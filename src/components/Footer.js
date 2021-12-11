import Logo from "../assets/logos/EzLaunder.svg";

export default function Footer() {
	return (
		<div className="footer text-black font-bold rounded-b-lg border shadow-lg p-8 m-0 w-full h-48">
			<div className={"container"}>
				<Logo className={"px-4 w-80"} />
			</div>
			<div className={"p-8 w-full"}>
        Webpack 5 + React HTML -`&gt; PDF renderer
			</div>
		</div>
	);
}
