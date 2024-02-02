import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
});


export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }
    const setUser = (user) => {
        if (user) {
            _setUser(user);
        } else {
            _setUser({});
        }
    }
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.substring(0, maxLength) + '...';
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            truncateText,
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);