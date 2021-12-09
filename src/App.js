import { Component } from 'react'

import Logo from './assets/logos/EzLaunder.svg'
import Table from './components/Table'
import VerticalBars from './components/charts/VerticalBars.js';
import './app.styles.scss'

class App extends Component {
  render() {
    return (
      <div className='wrapper flex flex-col items-top justify-top h-screen w-screen'>
        <div className='header text-black font-bold rounded-lg border shadow-lg p-8 m-0 w-screen h-48'>
	        <div className={'container'}>
		        <Logo className={'w-80'} />
	        </div>
          <div className={'py-8 w-full'} >
            Webpack 6 boilerplate with React 17 and Tailwind 2
          </div>
        </div>
        <div className='content flex flex-col text-black font-bold rounded-lg border shadow-lg p-8 m-0 w-screen h-fit'>
	        <VerticalBars className='content flex flex-col mb-12' />
	        <Table />
        </div>
        <div className='footer text-black font-bold rounded-lg border shadow-lg p-8 m-0 w-screen h-48'>
	        <div className={'container'}>
		        <Logo className={'px-4 w-80'} />
	        </div>
          <div className={'p-8 w-full'} >
            Webpack 6 boilerplate with React 17 and Tailwind 2
          </div>
        </div>
      </div>
    )
  }
}

export default App
