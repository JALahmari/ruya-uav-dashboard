import React, { useState } from 'react';
import { Download, Search, Filter, FileText, AlertTriangle, Info, CheckCircle } from 'lucide-react';

function Logs() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock log data
  const logs = [
    {
      id: 1,
      timestamp: '2024-12-15T14:30:25Z',
      level: 'info',
      category: 'flight',
      message: 'Mission MSN-001 initiated successfully',
      details: 'UAV takeoff completed, altitude: 120m, GPS lock: confirmed'
    },
    {
      id: 2,
      timestamp: '2024-12-15T14:28:15Z',
      level: 'warning',
      category: 'detection',
      message: 'Crowd density approaching threshold in Area-B',
      details: 'Detected density: 65%, threshold: 70%, people count: 245'
    },
    {
      id: 3,
      timestamp: '2024-12-15T14:25:45Z',
      level: 'error',
      category: 'system',
      message: 'Temporary communication loss with UAV',
      details: 'Connection restored after 15 seconds, no data loss occurred'
    },
    {
      id: 4,
      timestamp: '2024-12-15T14:20:12Z',
      level: 'info',
      category: 'user',
      message: 'User admin logged into system',
      details: 'IP: 192.168.1.100, Browser: Chrome 120.0.0'
    },
    {
      id: 5,
      timestamp: '2024-12-15T14:15:33Z',
      level: 'success',
      category: 'detection',
      message: 'AI model processing completed',
      details: 'Frame processing time: 0.8s, confidence: 94.5%'
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter || log.category === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-danger-600 bg-danger-50 border-danger-200';
      case 'warning': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'success': return 'text-success-600 bg-success-50 border-success-200';
      default: return 'text-primary-600 bg-primary-50 border-primary-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">System Logs</h1>
          <p className="text-neutral-600">Monitor system events and troubleshoot issues</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="h-4 w-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
          <div className="text-2xl font-bold text-neutral-900">{logs.length}</div>
          <div className="text-xs text-neutral-600">Total Events</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
          <div className="text-2xl font-bold text-danger-600">
            {logs.filter(l => l.level === 'error').length}
          </div>
          <div className="text-xs text-neutral-600">Errors</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
          <div className="text-2xl font-bold text-warning-600">
            {logs.filter(l => l.level === 'warning').length}
          </div>
          <div className="text-xs text-neutral-600">Warnings</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
          <div className="text-2xl font-bold text-success-600">
            {logs.filter(l => l.level === 'success').length}
          </div>
          <div className="text-xs text-neutral-600">Success</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {logs.filter(l => l.level === 'info').length}
          </div>
          <div className="text-xs text-neutral-600">Info</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Logs</option>
            <option value="error">Errors Only</option>
            <option value="warning">Warnings Only</option>
            <option value="success">Success Only</option>
            <option value="info">Info Only</option>
            <option value="flight">Flight Logs</option>
            <option value="detection">Detection Logs</option>
            <option value="system">System Logs</option>
            <option value="user">User Activity</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
              <p>No logs found matching your criteria.</p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const LevelIcon = getLevelIcon(log.level);
              return (
                <div key={log.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-lg ${getLevelColor(log.level)}`}>
                      <LevelIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                          {log.category.toUpperCase()}
                        </span>
                        <span className="text-xs text-neutral-500">{formatTimestamp(log.timestamp)}</span>
                      </div>
                      
                      <h3 className="text-sm font-semibold text-neutral-900 mb-1">{log.message}</h3>
                      <p className="text-sm text-neutral-600">{log.details}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Logs;
