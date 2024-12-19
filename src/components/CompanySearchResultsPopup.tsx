import React from 'react';
import { Record } from '../types';

interface CompanySearchResultsPopupProps {
  results: Record[];
  onClose: () => void;
}

export const CompanySearchResultsPopup: React.FC<CompanySearchResultsPopupProps> = ({ results, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-1/2 text-green-500">
        <h2 className="text-xl mb-4">Search Results</h2>
        <button onClick={onClose} className="ml-4 text-red-500">
          Close
        </button>
        <div className="mt-4">
          {results.length > 0 ? (
            <>
              <div>Information found:</div>
              {results.map((company) => (
                <div key={company.id} className="border-b border-gray-600 py-2">
                  <div>{company.name}</div>
                  {company.logo && <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16" />}
                </div>
              ))}
            </>
          ) : (
            <div>
              No information found. Would you like to add information for research?
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
