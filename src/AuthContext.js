import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        // Kiểm tra localStorage để khôi phục trạng thái người dùng khi trang được tải lại
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Lưu thông tin người dùng vào localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
    };



    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
