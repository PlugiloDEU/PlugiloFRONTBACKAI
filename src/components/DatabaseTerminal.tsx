import React, { useState } from 'react';
import { Terminal, Volume2, VolumeX, LogOut, Users } from 'lucide-react';
import { User, Record as CompanyRecord } from '../types';
import { useSound } from '../hooks/useSound';
import { SearchResults } from './SearchResults';
import { CompanySearchPopup } from './CompanySearchPopup';

interface DatabaseTerminalProps {
  user: User;
  onLogout: () => void;
}

export const DatabaseTerminal: React.FC<DatabaseTerminalProps> = ({ user, onLogout }) => {
  const [searchResults, setSearchResults] = useState<CompanyRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showCompanySearch, setShowCompanySearch] = useState(false); // State to control popup visibility
  const { playSound, toggleSound, isEnabled } = useSound();

  const handleLogout = () => {
    playSound('logout');
    onLogout();
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-8 font-mono">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-green-500/80 text-lg">
          <Terminal className="w-6 h-6" />
          <span>DATABASE QUERY INTERFACE</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSound}
            className="text-green-500/70 hover:text-green-500 transition-colors"
            aria-label={isEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {isEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          <div className="text-base text-green-500/70">
            USER: {user.username} | ROLE: {user.role}
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500/70 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowCompanySearch(true)} // Set state to true to show popup
          className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg transition-colors"
        >
          <span>Company Search</span>
        </button>
        <button
          className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg transition-colors"
        >
          <span>Person Search</span>
        </button>
        <button
          className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg transition-colors"
        >
          <span>Product Search</span>
        </button>
      </div>

      <SearchResults 
        results={searchResults}
        isSearching={isSearching}
        onLogout={handleLogout}
      />

      {showCompanySearch && (
        <CompanySearchPopup onClose={() => setShowCompanySearch(false)} /> // Pass function to close popup
      )}
    </div>
  );
};
