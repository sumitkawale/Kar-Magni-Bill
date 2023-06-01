import './App.css'
import Bill from './Bill'
import { useEffect, useState } from 'react'

function App() {
	const [data, setData] = useState([])

	return (
		<>
			<div className='billPage'>
				<Bill />
				<div className='billSeparator'></div>
				<Bill />
			</div>
		</>
	)
}

export default App
