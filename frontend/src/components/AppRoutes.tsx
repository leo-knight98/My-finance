import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/dashboard/Dashboard"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Transaction from "../pages/transactionPage/Transaction"
import Categories from "../pages/categories/Categories"
import useUserContext from "../hooks/UserContext"
import Debts from "../pages/debts/Debts"
import { useEffect } from "react"
import Goals from "../pages/goals/Goals"
import Home from "../pages/home/Home"


function AppRoutes() {
    const { isLogged, login } = useUserContext()
    useEffect(() => {
        if(localStorage.getItem('user') !== null) {
            
            const user = JSON.parse(localStorage.getItem('user')!)

                login(user.username)
            
        }
    }, [])
    return(
        <>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={(isLogged) ? <Dashboard /> : <Navigate to='/login' />}/>
              <Route path='/transaction' element={(isLogged) ? <Transaction /> : <Navigate to='/login' />} />
              <Route path='/categories' element={(isLogged) ? <Categories /> : <Navigate to='/login' />} />
              <Route path='/debts' element={(isLogged) ? <Debts /> : <Navigate to='/login' />} />
              <Route path='/goals' element={(isLogged) ? <Goals /> : <Navigate to='/login' />} />
            </Routes>
        </>
    )
}
export default AppRoutes