import axios from 'axios';
export const researchCompany = (app) => {
    app.post('/api/researchCompany', async (req, res) => {
        const { domain } = req.body;
        try {
            // Call the agent API with the domain
            const agentResponse = await axios.post('https://api-lr.agent.ai/api/company/lite', {
                domain: domain,
                report_component: 'harmonic_funding_and_web_traffic',
                user_id: null,
            }, {
                headers: {
                    accept: '*/*',
                    'Content-Type': 'application/json',
                    origin: 'https://agent.ai',
                    referer: 'https://agent.ai/',
                    'user-agent': 'Mozilla/5.0',
                },
            });
            res.status(200).json(agentResponse.data);
        }
        catch (error) {
            console.error('Error fetching data from agent API:', error);
            res.status(500).send('Failed to fetch data from agent API');
        }
    });
};
