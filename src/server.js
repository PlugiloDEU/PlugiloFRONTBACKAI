// src/server.ts
import express from 'express';
import path from 'path';
import { addCompany } from './api/addCompany.js';
import { researchCompany } from './api/researchCompany.js';
const app = express();
const port = 3000;
app.use(express.json());
// Register API endpoints
addCompany(app);
researchCompany(app);
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
