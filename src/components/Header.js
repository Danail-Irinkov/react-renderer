import Logo from "../assets/logos/EzLaunder.svg";

export default function Header() {
	return (
		<div className="header text-black font-bold rounded-t-lg border shadow-lg p-8 m-0 w-full h-48">
			<div className={"container"}>
				<Logo className={"w-80"} />
			</div>
			<div className={"py-8 w-full"}>
        Webpack 5 + React HTML -`&gt; PDF renderer
			</div>
		</div>
	);
}
