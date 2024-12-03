import UserProvider from './contexts/UserProvider';
import CategoryProvider from './contexts/CategoryProvider';
import AppRoutes from './components/AppRoutes';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <>
      <UserProvider>
      <Sidebar />
        <div className='content'>
            <Header />
            <CategoryProvider>
              <AppRoutes />
            </CategoryProvider>
        </div>
      </UserProvider>
    </>
  )
}
export default App