import React from "react";

const userInfoReducer = (prev, newValue) => {
    if(!newValue) {
        localStorage.removeItem('user');

        return null;
    }

    localStorage.setItem('user', JSON.stringify(newValue));
    console.log(newValue);
    return newValue;
}

const MainContext = React.createContext({});

const MainContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = React.useReducer(userInfoReducer, JSON.parse(localStorage.getItem('user')));

    return (
        <MainContext.Provider value={{ userInfo, setUserInfo }}>
            { children }
        </MainContext.Provider>
    );
}

export {
    MainContextProvider, 
    MainContext
};