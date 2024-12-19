import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const companiesDir = path.join(__dirname, '../src/data/companies');

function searchCompanyByName(name, dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      // Recursively search subdirectories
      const found = searchCompanyByName(name, filePath);
      if (found) {
        return true; // Company found in a subdirectory
      }
    } else if (file.endsWith('.json')) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (data.name && data.name.toLowerCase() === name.toLowerCase()) {
          console.log(JSON.stringify(data, null, 2));
          return true; // Company found
        }
      } catch (error) {
        console.error(`Error parsing JSON file ${filePath}:`, error.message);
      }
    }
  }
  return false; // Company not found in this directory
}

const companyName = process.argv.slice(2).join(' ');
if (!companyName) {
  console.log('Please provide a company name to search for.');
} else {
  const found = searchCompanyByName(companyName, companiesDir);
  if (!found) {
    console.log('Company not found.');
  }
}