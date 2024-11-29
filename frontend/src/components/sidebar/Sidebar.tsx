import {  useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiLogin, CiLogout } from "react-icons/ci";

import styles from "./Sidebar.module.css"
import useUserContext from "../../hooks/UserContext";


function Sidebar() {
    const { isLogged, logout } = useUserContext()
    const [isToggled, setIsToggled] = useState(true)
      function manageToggle() {
        if(!isToggled) {
            setIsToggled(true)
        } else {
            setIsToggled(false)
        }
    }
    return (
        <div className={(isToggled) ? styles.sideBar : styles.sideBarNotToggled}>
            <div className={styles.headerSide}>
                <h1 className={styles.title}>JLA {(isToggled) ? 'Finance' : ''} </h1>
                <button className={styles.toggleSidebar} onClick={manageToggle}>{(isToggled) ? <IoIosArrowBack /> : <IoIosArrowForward />}</button>
            </div>
            <ul className={styles.navList}>               
                {(isLogged) ? (
                    <>
                        <li className={(isToggled) ? styles.listItem : styles.smallListItem}><NavLink to="/dashboard" className={styles.link}><i className={styles.listIcon}><MdDashboard /></i>{(isToggled ? 'Dashboard' : '')}</NavLink></li>
                        <li className={(isToggled) ? styles.listItem : styles.smallListItem}><NavLink to='/transaction' className={styles.link}><i className={styles.listIcon}><FaMoneyBillTransfer /></i>{(isToggled ? 'Transactions' : '')}</NavLink></li>
                        <li className={(isToggled) ? styles.listItem : styles.smallListItem}><a href="#" onClick={logout} className={styles.link}><i className={styles.listIcon}><CiLogout /></i>{(isToggled ? 'Logout' : '')}</a></li>
                    </>
                ) : (
                    <>
                        <li className={(isToggled) ? styles.listItem : styles.smallListItem}><NavLink to='/' className={styles.link}><i className={styles.listIcon}><CiLogin /></i>{(isToggled ? 'Login' : '')}</NavLink></li>
                        <li className={(isToggled) ? styles.listItem : styles.smallListItem}><NavLink to='/register' className={styles.link}><i className={styles.listIcon}><CiLogin /></i>{(isToggled ? 'Register' : '')}</NavLink></li>
                    </>
                )} 
                
            </ul>
        </div>
    );
}

export default Sidebar;