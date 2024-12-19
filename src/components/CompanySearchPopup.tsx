import React, { useState } from 'react';
import { Record } from '../types';
import { readCompanyFiles } from '../utils/recordManager.ts';
import { CompanySearchResultsPopup } from './CompanySearchResultsPopup';

interface CompanySearchPopupProps {
  onClose: () => void;
}

export const CompanySearchPopup: React.FC<CompanySearchPopupProps> = ({ onClose }) => {
  const [searchResults, setSearchResults] = useState<Record[]>([]);
  const [nameQuery, setNameQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [countryQuery, setCountryQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');

  const handleSearch = () => {
    setSearchMessage('Search initiated, calling AI Database Search Agent...');
    const results = readCompanyFiles().filter((company: Record) =>
      company.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      (categoryQuery ? company.category.some((cat: string) => cat.includes(categoryQuery)) : true) &&
      (countryQuery ? company.country.includes(countryQuery) : true)
    );
    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-1/2 text-green-500">
        <h2 className="text-xl mb-4">Company Search</h2>
        <input
          type="text"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          placeholder="Company Name"
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-900 text-green-500"
        />
        <input
          type="text"
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
          placeholder="Category (optional)"
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-900 text-green-500"
        />
        <input
          type="text"
          value={countryQuery}
          onChange={(e) => setCountryQuery(e.target.value)}
          placeholder="Country (optional)"
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-900 text-green-500"
        />
        <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">
          Search
        </button>
        <button onClick={onClose} className="ml-4 text-red-500">
          Close
        </button>
        {searchMessage && <div className="mt-4">{searchMessage}</div>}
      </div>
      {showResults && (
        <CompanySearchResultsPopup results={searchResults} onClose={() => setShowResults(false)} />
      )}
    </div>
  );
};
