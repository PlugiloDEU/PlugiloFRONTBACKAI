// src/server.ts
import express, { Request, Response } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { addCompany } from './api/addCompany.js';
import { researchCompany } from './api/researchCompany.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Serve static files from the 'dist/client' directory
app.use(express.static(path.join(__dirname, '../dist/client')));

// Register API endpoints
addCompany(app);
researchCompany(app);

// Fallback to index.html for SPA routing (only for paths without a dot)
app.get('*', (req: Request, res: Response) => {
  if (!req.path.includes('.')) {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
  } else {
    res.status(404).end();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
