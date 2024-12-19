import { getAllRecords } from './recordManager';
export const addVerificationEntry = (recordId, entry) => {
    const records = getAllRecords();
    const record = records.find(r => r.id === recordId);
    if (record) {
        if (!record.verificationStatus) {
            record.verificationStatus = {};
        }
        if (!record.verificationStatus[entry.fieldName]) {
            record.verificationStatus[entry.fieldName] = {
                verified: entry.action === 'verify',
                lastChecked: new Date().toISOString(),
                verifiedBy: entry.verifiedBy,
                entries: []
            };
        }
        record.verificationStatus[entry.fieldName].entries = [
            ...(record.verificationStatus[entry.fieldName].entries || []),
            {
                ...entry,
                timestamp: new Date().toISOString()
            }
        ];
        // Update verification status based on action
        if (entry.action === 'verify') {
            record.verificationStatus[entry.fieldName].verified = true;
        }
        else {
            record.verificationStatus[entry.fieldName].flagged = true;
        }
        record.verificationStatus[entry.fieldName].lastChecked = new Date().toISOString();
        record.verificationStatus[entry.fieldName].verifiedBy = entry.verifiedBy;
    }
};
