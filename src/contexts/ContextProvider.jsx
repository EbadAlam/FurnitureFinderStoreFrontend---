import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
});


export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem('user_data')));
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
        _setUser(user);
        if (user) {
            localStorage.setItem('user_data', JSON.stringify(user));
        } else {
            localStorage.removeItem("user_data");
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);