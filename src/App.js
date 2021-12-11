import Header from "./components/Header";
import Content1 from "./components/Content1";
import Footer from "./components/Footer";

function App(context = {}) {
	console.log("App Context", context);
	let customer = {};
	if (context.customer) customer = context.customer;

	let Content = Content1;
	if (context.type === "Content1") Content = Content1;

	return (
		<div className="wrapper flex flex-col items-top justify-top h-auto w-full">
			<Header />
			<Content customer={customer} />
			<Footer />
		</div>
	);
}

export default App;
