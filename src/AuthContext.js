import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        studentId: null,
        staffId: null,
        login: (studentId, staffId) => {
            setAuth({ isAuthenticated: true, studentId, staffId });
        },
        logout: () => {
            setAuth({ isAuthenticated: false, studentId: null, staffId: null });
        }
    });

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};
