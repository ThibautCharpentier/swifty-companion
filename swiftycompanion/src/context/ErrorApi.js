import React, { createContext, useState, useContext } from 'react';

const ErrorApiContext = createContext();

export const ErrorApiProvider = ({ children }) => {
    const [errorApi, setErrorApi] = useState("");

    return (
        <ErrorApiContext.Provider value={{ errorApi, setErrorApi }}>
            {children}
        </ErrorApiContext.Provider>
    );
};

export const useErrorApi = () => {
    return useContext(ErrorApiContext);
};
