import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export const addCompany = (app: any) => {
  app.post('/api/addCompany', async (req: Request, res: Response) => {
    const companyData = req.body;
    const domain = companyData.domain;

    let mergedData = { ...companyData };

    try {
      // Call the agent API with the domain
      const agentResponse = await axios.post(
        'https://api-lr.agent.ai/api/company/lite',
        {
          domain: domain,
          report_component: 'harmonic_funding_and_web_traffic',
          user_id: null,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            origin: 'https://agent.ai',
            referer: 'https://agent.ai/',
            'user-agent': 'Mozilla/5.0',
          },
        }
      );

      if (agentResponse.data && Object.keys(agentResponse.data).length > 0) {
        // Merge agent API data with companyData
        mergedData = { ...mergedData, ...agentResponse.data };
      } else {
        console.warn('Agent API returned empty data for domain:', domain);
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Agent API error for domain', domain, ':', error.response.data);
      } else {
        console.error('Error fetching data from agent API for domain', domain, ':', error.message);
      }
      // Proceed without agent API data
    }

    const companyFileName = domain.replace(/\s+/g, '-').toLowerCase() + '.json';
    const filePath = path.join(__dirname, '../data/companies', companyFileName);

    fs.writeFile(filePath, JSON.stringify(mergedData, null, 2), (err) => {
      if (err) {
        console.error('Error writing company file:', err);
        return res.status(500).send('Failed to write company file');
      }
      res.status(200).send('Company added successfully');
    });
  });
};