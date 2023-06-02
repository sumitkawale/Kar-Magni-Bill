import './App.css'
import Bill from './Bill'

function App() {
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
