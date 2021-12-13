import React from 'react'

import styles from 'styles.scss'

export default class App extends React.PureComponent {
	UNSAFE_componentWillMount() {
		if (styles.__inject__) {
			styles.__inject__(this.props.staticContext) // staticContext from react-router on server
		}
	}

	render() {
		return <div class={styles.heading}>Hello World</div>
	}
}
