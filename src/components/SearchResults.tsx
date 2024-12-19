import React, { useState } from 'react';
import { Search, FileText, Database, LogOut, Users, Gauge } from 'lucide-react'; // Replaced Speedometer with Gauge
import { Record } from '../types';
import { RecordViewer } from './RecordViewer';
import { useSound } from '../hooks/useSound';
import { getAllRecords } from '../utils/recordManager';
import { UserManagementPanel } from './UserManagementPanel';

interface SearchResultsProps {
  results: Record[];
  isSearching: boolean;
  onLogout: () => void;
  onEditCompany?: (company: Record) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  isSearching, 
  onLogout,
  onEditCompany 
}) => {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const { playSound } = useSound();

  const handleRecordClick = (record: Record) => {
    playSound('diskRead');
    setSelectedRecord(record);
  };

  const handleLogout = () => {
    playSound('logout');
    onLogout();
  };

  if (isSearching) {
    return (
      <div className="relative min-h-[500px] border border-green-500/30 rounded-lg p-6 font-mono text-base">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Search className="w-12 h-12 animate-spin mx-auto mb-3" />
            <div className="text-lg">SEARCHING DATABASE...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative border border-green-500/30 rounded-lg p-6 font-mono text-base">
        {results.length === 0 ? null : (
          <div className="grid grid-cols-2 gap-6">
            {results.map((record) => (
              <div
                key={record.id}
                className="border border-green-500/20 rounded-lg p-4 hover:bg-green-500/5 transition-colors cursor-pointer"
                onClick={() => handleRecordClick(record)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-bold text-lg">FILE ID: {record.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-green-500/70 mb-3">
                  <div>STATUS: {record.status}</div>
                  <div>LEVEL: {record.level}</div>
                </div>
                <div className="text-green-500/90 mb-2 text-lg">SUBJECT: {record.subject}</div>
                <div className="text-green-500/70">{record.details}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border border-green-500/30 rounded-lg p-6 font-mono">
          <div className="flex items-center gap-2 text-green-500/70 mb-4">
            <Database className="w-5 h-5" />
            <span className="font-bold">SYSTEM STATISTICS</span>
          </div>
          <div className="space-y-2 text-green-500/60">
            <div>Total Companies: 256,876</div>
            <div>Active Records: 243,992</div>
            <div>Last Update: {new Date().toISOString().split('T')[0]}</div>
          </div>
        </div>

        <div className="border border-green-500/30 rounded-lg p-6 font-mono">
          <div className="flex items-center gap-2 text-green-500/70 mb-4">
            <Gauge className="w-5 h-5" /> {/* Updated icon */}
            <span className="font-bold">SYSTEM STATUS</span>
          </div>
          <div className="space-y-2 text-green-500/60">
            <div>Database Space Used: 75%</div>
            <div>Speed: 120 queries/sec</div>
            <div className="flex justify-center">
              <div className="w-24 h-24 border-4 border-green-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">120</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <button
          onClick={() => setShowUserManagement(true)}
          className="flex items-center gap-2 text-green-500/70 hover:text-green-500 transition-colors"
        >
          <Users className="w-5 h-5" />
          <span>USER MANAGEMENT</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>TERMINATE SESSION</span>
        </button>
      </div>

      {selectedRecord && (
        <RecordViewer
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

      {showUserManagement && (
        <UserManagementPanel onClose={() => setShowUserManagement(false)} />
      )}
    </div>
  );
};
