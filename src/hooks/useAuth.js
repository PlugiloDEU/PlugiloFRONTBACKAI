import { useState } from 'react';
import users from '../data/users.json';
const getRolePermissions = (role) => {
    switch (role) {
        case 'OWNER':
            return {
                canVerify: true,
                canEdit: true,
                canDelete: true,
                canAddUsers: true,
                canModifyRoles: true,
                canExportData: true,
                canAccessAI: true,
                canManageSystem: true
            };
        case 'ADMIN':
            return {
                canVerify: true,
                canEdit: true,
                canDelete: true,
                canAddUsers: true,
                canModifyRoles: false,
                canExportData: true,
                canAccessAI: true,
                canManageSystem: true
            };
        case 'MOD':
            return {
                canVerify: true,
                canEdit: true,
                canDelete: false,
                canAddUsers: false,
                canModifyRoles: false,
                canExportData: true,
                canAccessAI: true,
                canManageSystem: false
            };
        case 'USER':
            return {
                canVerify: true,
                canEdit: false,
                canDelete: false,
                canAddUsers: false,
                canModifyRoles: false,
                canExportData: true,
                canAccessAI: true,
                canManageSystem: false
            };
    }
};
export const useAuth = () => {
    const [auth, setAuth] = useState({
        user: null,
        isAuthenticated: false,
        permissions: getRolePermissions('USER')
    });
    const login = (username, password) => {
        const user = users.users.find((u) => u.username === username && u.password === password);
        if (user) {
            const permissions = getRolePermissions(user.role);
            setAuth({
                user,
                isAuthenticated: true,
                permissions
            });
            return true;
        }
        return false;
    };
    const logout = () => {
        setAuth({
            user: null,
            isAuthenticated: false,
            permissions: getRolePermissions('USER')
        });
    };
    return { ...auth, login, logout };
};