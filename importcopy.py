import subprocess
import json
import os
import sys
import logging
from urllib.parse import urlparse

# Set up logging
def setup_logging():
    os.makedirs('logs', exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('logs/api_calls.log'),
            logging.StreamHandler()
        ]
    )

setup_logging()

class AgentAPIClient:
    def __init__(self):
        self.api_url = 'https://api-lr.agent.ai/api/company/lite'
        self.headers = {
            'accept': '*/*',
            'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'origin': 'https://agent.ai',
            'referer': 'https://agent.ai/',
            'user-agent': 'Mozilla/5.0'
        }

    def call_api(self, domain):
        try:
            data = {
                "domain": domain,
                "report_component": "harmonic_funding_and_web_traffic",
                "user_id": None
            }

            command = [
                'curl', '-s', self.api_url,
                '-X', 'POST',
                *sum((['-H', f'{k}: {v}'] for k, v in self.headers.items()), []),
                '--data-raw', json.dumps(data)
            ]

            result = subprocess.run(command, capture_output=True, text=True)

            if result.returncode != 0:
                logging.error(f"Error calling API: {result.stderr}")
                return None

            if not result.stdout.strip():
                logging.error(f"Empty response for domain: {domain}")
                return None

            # Check if response is valid JSON
            try:
                response_data = json.loads(result.stdout)
            except json.JSONDecodeError:
                logging.error(f"Invalid JSON response for domain: {domain}")
                return None

            return response_data
        except Exception as e:
            logging.error(f"Exception while calling API: {str(e)}")
            return None

def save_company_data(domain, data):
    try:
        file_name = domain.replace('.', '_') + '.json'
        file_path = os.path.join('src', 'data', 'companies', file_name)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

        logging.info(f"Data saved for {domain}")
    except Exception as e:
        logging.error(f"Error saving data for {domain}: {str(e)}")

def process_domain(domain):
    client = AgentAPIClient()
    data = client.call_api(domain)
    if data:
        save_company_data(domain, data)
    else:
        logging.error(f"Failed to retrieve data for {domain}")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python importcopy.py <domain>")
        sys.exit(1)
    domain_input = sys.argv[1]
    process_domain(domain_input)