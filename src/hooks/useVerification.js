import { useState, useCallback } from 'react';
import verificationLogs from '../data/verificationLogs.json';
export const useVerification = (userId) => {
    const [logs, setLogs] = useState(verificationLogs.logs);
    const logVerification = useCallback((recordId, field, action) => {
        const newLog = {
            recordId,
            field,
            timestamp: new Date().toISOString(),
            action,
            userId
        };
        setLogs(prevLogs => [...prevLogs, newLog]);
        // In a real app, this would be persisted to a database
    }, [userId]);
    return { logs, logVerification };
};
