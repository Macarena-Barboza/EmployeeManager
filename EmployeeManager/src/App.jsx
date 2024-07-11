import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Start />}></Route>
				<Route path='/adminlogin' element={<Login />}></Route>
				<Route path='/employee_login' element={<EmployeeLogin />}></Route>

				<Route path='/dashboard' element={<PrivateRoute> <Dashboard /></PrivateRoute>}>
					<Route path='' element={<Home />}></Route>
					<Route path='/dashboard/category' element={<Category />}></Route>
					<Route path='/dashboard/add_category' element={<AddCategory />}></Route>
					<Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
