import logo from "../assets/logos/tallrock-t-small.png";

export default function Header() {
	return (
		<div className="header text-black font-bold xl:rounded-t-lg xl:border xl:shadow-lg p-4 m-0 w-full">
			<div className={"container"}>
				{/*<Logo className={"w-80"} />*/}
				<img src={logo} className={"h-32 px-4 w-auto logo"}/>
			</div>
			<div className={"py-2 px-4 w-full"}>
        Webpack 5 + React HTML -`&gt; PDF renderer
			</div>
		</div>
	);
}
