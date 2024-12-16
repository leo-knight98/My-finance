import UserProvider from './contexts/UserProvider';
import CategoryProvider from './contexts/CategoryProvider';
import TransactionProvider from './contexts/TransactionProvider';
import GoalProvider from './contexts/GoalProvider';
import AppRoutes from './components/AppRoutes';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer />
      <Sidebar />
        <div className='content'>
            <Header />
            <CategoryProvider>
              <TransactionProvider>
                <GoalProvider>
                  <AppRoutes />
                </GoalProvider>
              </TransactionProvider>
            </CategoryProvider>
        </div>
      </UserProvider>
    </>
  )
}
export default App