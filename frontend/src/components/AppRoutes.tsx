import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/dashboard/Dashboard"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Transaction from "../pages/transactionPage/Transaction"
import Categories from "../pages/categories/Categories"
import useUserContext from "../hooks/UserContext"


function AppRoutes() {
    const { isLogged } = useUserContext()
    return(
        <>
            <Routes>
              <Route path='/' element={(!isLogged) ? <Login /> : <Navigate to='/dashboard' />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={(isLogged) ? <Dashboard /> : <Navigate to='/' />}/>
              <Route path='/transaction' element={<Transaction />} />
              <Route path='/categories' element={<Categories />} />
            </Routes>
        </>
    )
}
export default AppRoutes