import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

export type User = {
    username: string,
    isLogged: boolean,
    login: (username: string) => void,
    logout: () => void
}
type UserProviderProps = {
    children: ReactNode;
};

const UserContext = createContext<User | null>(null)
function UserProvider({children}: UserProviderProps) {
    const [user, setUser] = useState({
        username: '',
        isLogged: false,
    })
    const valueToSend = {
        ...user,
        login,
        logout
    }
    const navigate = useNavigate()
    function login(username: string) {
        setUser({username: username, isLogged: true})
        localStorage.setItem('user', JSON.stringify({username: username, isLogged: true}))
        navigate('/dashboard')
    }

    function logout() {
        setUser({username: '', isLogged: false})
        localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <UserContext.Provider value={valueToSend}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider
export { UserContext }