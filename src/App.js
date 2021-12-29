import Header from "./components/Header";
import Content1 from "./components/Content1";
import Footer from "./components/Footer";
import "./index.scss";

function App(context = null) {
	let customer = {};
	let Content = Content1;

	let footer_style = {
		marginTop: '500px!important'
	}
	if (context?.props) { // processing properties from SSR server, skipping in devtool hotreload
		let props = context.props
		console.log("App Context", props);
		if (props.customer) customer = props.customer;
		if (props.template === "Content1") Content = Content1;
	}
	return (
		<div className="wrapper flex flex-col items-top justify-top h-auto w-full" style={{maxWidth: '1200px'}}>
			<Header />
			<Content customer={customer} />
			<Footer style={footer_style}/>
		</div>
	);
}

export default App;
