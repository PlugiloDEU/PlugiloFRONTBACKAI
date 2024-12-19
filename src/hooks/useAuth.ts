import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import users from '../data/users.json';
import { User, UserRole, UserPermissions } from '../types';

const getRolePermissions = (role: UserRole): UserPermissions => {
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
  const [auth, setAuth] = useState<{
    user: User | null;
    isAuthenticated: boolean;
    permissions: UserPermissions;
  }>({
    user: null,
    isAuthenticated: false,
    permissions: getRolePermissions('USER')
  });

  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const permissions = getRolePermissions(user.role);
      setAuth({
        user,
        isAuthenticated: true,
        permissions
      });
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = users.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const permissions = getRolePermissions(user.role);
      setAuth({
        user,
        isAuthenticated: true,
        permissions
      });
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
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
    Cookies.remove('user');
  };

  return { ...auth, login, logout };
};
