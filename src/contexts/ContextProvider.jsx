import { createContext, useContext, useState } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({
    user: null,
    token: null,
    loading: true,
});


export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState({});
    const [_loading, setLoading] = useState(true);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }
    const fetchUserData = () => {
        setLoading(true);
        axiosClient.get(`/user/${JSON.parse(localStorage.getItem('user_email'))}`)
            .then(({ data }) => {
                setUser(data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
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
            _loading,
            setUser,
            setToken,
            truncateText,
            fetchUserData,
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);