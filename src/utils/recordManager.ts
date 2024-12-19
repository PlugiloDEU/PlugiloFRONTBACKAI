import { Record } from '../types';
import fs from 'fs';
import path from 'path';

export const readCompanyFiles = (): Record[] => {
  const companiesDir = path.resolve(__dirname, '../data/companies');
  const files = fs.readdirSync(companiesDir);
  const companies: Record[] = [];

  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const filePath = path.join(companiesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const company = JSON.parse(fileContent) as Record;
      companies.push(company);
    }
  });

  return companies;
};
