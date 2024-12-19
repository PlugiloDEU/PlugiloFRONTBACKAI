import { useState } from 'react';
import { useAuth } from './useAuth';
export const useSecurityFeatures = () => {
    const [securityLogs, setSecurityLogs] = useState([]);
    const [securityStatus, setSecurityStatus] = useState({
        encryptionEnabled: true,
        lastPasswordChange: new Date().toISOString(),
        twoFactorEnabled: false,
        sessionTimeout: 30
    });
    const { user } = useAuth();
    const logSecurityEvent = (action) => {
        const newLog = {
            id: crypto.randomUUID(),
            userId: user?.id || '',
            action,
            timestamp: new Date().toISOString(),
            ipAddress: '127.0.0.1' // In a real app, get from the server
        };
        setSecurityLogs(prev => [...prev, newLog]);
    };
    const toggleTwoFactor = () => {
        setSecurityStatus(prev => ({
            ...prev,
            twoFactorEnabled: !prev.twoFactorEnabled
        }));
        logSecurityEvent('2FA_TOGGLE');
    };
    const updateSessionTimeout = (minutes) => {
        setSecurityStatus(prev => ({
            ...prev,
            sessionTimeout: minutes
        }));
        logSecurityEvent('SESSION_TIMEOUT_UPDATE');
    };
    return {
        securityLogs,
        securityStatus,
        logSecurityEvent,
        toggleTwoFactor,
        updateSessionTimeout
    };
};
