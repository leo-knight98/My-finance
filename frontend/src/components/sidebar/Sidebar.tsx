import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiFilter, CiLogout, CiLogin } from "react-icons/ci";
import { FaHome, FaUserPlus } from "react-icons/fa";

import styles from "./Sidebar.module.css";
import useUserContext from "../../hooks/UserContext";
import { GiPayMoney, GiPiggyBank } from "react-icons/gi";

function Sidebar() {
  const { isLogged, logout } = useUserContext();

  return (
    <div className={styles.sidebar}>
      {/* Contenedor del logo */}
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
      
      {/* Menú de navegación */}
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink 
              to="/" 
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
            >
              <FaHome className={styles.icon} />
              <span className={styles.linkText}>Home</span>
            </NavLink>
          </li>
          {isLogged ? (
            <>
              <li className={styles.navItem}>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  <MdDashboard className={styles.icon} />
                  <span className={styles.linkText}>Dashboard</span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink 
                  to="/transaction" 
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  <FaMoneyBillTransfer className={styles.icon} />
                  <span className={styles.linkText}>Transactions</span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink 
                  to="/categories" 
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  <CiFilter className={styles.icon} />
                  <span className={styles.linkText}>Categories</span>
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to='/debts' 
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  <GiPayMoney className={styles.icon} />
                  <span className={styles.linkText}>Debts</span>
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to='/goals' 
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  <GiPiggyBank className={styles.icon} />
                  <span className={styles.linkText}>Goals</span>
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <button className={styles.link} onClick={logout}>
                  <CiLogout className={styles.icon} />
                  <span className={styles.linkText}>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem}>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  <CiLogin className={styles.icon} />
                  <span className={styles.linkText}>Login</span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                >
                  <FaUserPlus className={styles.icon} />
                  <span className={styles.linkText}>Register</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
