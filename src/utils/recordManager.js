export const getAllRecords = () => {
    const modules = import.meta.glob('../data/companies/**/*.json', { eager: true });
    const records = [];
    for (const path in modules) {
        const module = modules[path];
        if (module) {
            records.push(module);
        }
    }
    return records;
};
export const getRecordById = (id) => {
    const records = getAllRecords();
    return records.find(record => record.id === id);
};
export const addRecord = (record) => {
    // Placeholder implementation
    // To persist data, implement writing to a backend or filesystem
    console.warn('addRecord is not implemented. Record:', record);
};
export const updateRecord = (id, updates) => {
    // Placeholder implementation
    // To persist data, implement writing to a backend or filesystem
    console.warn('updateRecord is not implemented. ID:', id, 'Updates:', updates);
};
export const generateNewId = () => {
    const allRecords = getAllRecords();
    const lastId = allRecords[allRecords.length - 1]?.id || 'CORP-0000';
    const lastNumber = parseInt(lastId.split('-')[1]);
    return `CORP-${String(lastNumber + 1).padStart(4, '0')}`;
};
