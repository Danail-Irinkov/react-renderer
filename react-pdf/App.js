// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import VerticalBars from '../src/components/charts/VerticalBars'

// Layouts
// import LayoutDefault from '../src/layouts/LayoutDefault.js';
import Header from "../src/components/Header";
import Content1 from "../src/components/Content1";
import Footer from "../src/components/Footer";

// Views
import Home from '../src/views/Home.js';
import Insurance1 from '../src/views/Insurance1.js';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#E4E4E4'
	},
	section: {
		margin: 10,
		padding: 0,
		width: '100%',
		display: 'flex',
		flexGrow: 1
	},
	wrapper: { height: '6rem' }
})

// Create Document Component
const MyDocument = (props) => {
	console.log('MyDocument props', props)
	let customer = {};
	if (props.customer) customer = context.customer;

	let Content = Content1;
	if (props.template === "Content1") Content = Content1;
	if (props.template === "Insurance1") Content = Insurance1;

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Header  style={styles.wrapper}/>
					<Text>Section #1</Text>
					<Content customer={customer} />
					{/*<Footer />*/}
				</View>
				<View style={styles.section}>
					<Text>Section #2</Text>
					{/*<Home/>*/}
				</View>
			</Page>
		</Document>
	);
}

export default MyDocument
