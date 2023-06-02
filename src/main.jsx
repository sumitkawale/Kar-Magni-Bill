import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Form from './Form.jsx'
import AllBills from './AllBills.jsx'

const router = createHashRouter([
	{
		path: "/",
		element: <Form />
	},
	{
		path: "/print/:data",
		element: <App />
	},
	{
		path: "/print/all",
		element: <AllBills />
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
