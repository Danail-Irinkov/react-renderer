import Header from "./components/Header";
import Content1 from "./components/Content1";
import Footer from "./components/Footer";
import styles from "./index.scss";

function App(context = {}) {
	console.log("App styles.__inject__", styles.__inject__);
	console.log("App this.props.", this);
	if (styles.__inject__)
		styles.__inject__(this.props.staticContext) // staticContext from react-router on server


	console.log("App Context", context);
	let customer = {};
	if (context.customer) customer = context.customer;

	let Content = Content1;
	if (context.type === "Content1") Content = Content1;

	return (
		<div className="wrapper flex flex-col items-top justify-top h-auto w-full" style={{maxWidth: '1200px'}}>
			<Header />
			<Content customer={customer} />
			<Footer />
		</div>
	);
}

export default App;
