import UserProvider from './contexts/UserProvider';
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
            <AppRoutes />
        </div>
      </UserProvider>
    </>
  )
}
export default App