import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Filter, Search, Bell } from 'lucide-react';
import { useSystem } from '../contexts/SystemContext';

function Alerts() {
  const { alerts, acknowledgeAlert, clearAllAlerts } = useSystem();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unacknowledged' && !alert.acknowledged) ||
      (filter === 'acknowledged' && alert.acknowledged);
    
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-danger-600 bg-danger-50 border-danger-200';
      case 'medium': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'low': return 'text-success-600 bg-success-50 border-success-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
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
          <h1 className="text-2xl font-bold text-neutral-900">Alert Management</h1>
          <p className="text-neutral-600">Monitor and manage system alerts and notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={clearAllAlerts}
            className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Clear All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Bell className="h-4 w-4" />
            Alert Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Alerts</p>
              <p className="text-2xl font-bold text-neutral-900">{alerts.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Unacknowledged</p>
              <p className="text-2xl font-bold text-danger-600">
                {alerts.filter(a => !a.acknowledged).length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-danger-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">High Priority</p>
              <p className="text-2xl font-bold text-warning-600">
                {alerts.filter(a => a.severity === 'high').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-warning-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Resolved</p>
              <p className="text-2xl font-bold text-success-600">
                {alerts.filter(a => a.acknowledged).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-success-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search alerts..."
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
            <option value="all">All Alerts</option>
            <option value="unacknowledged">Unacknowledged</option>
            <option value="acknowledged">Acknowledged</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
              <p>No alerts found matching your criteria.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-6 ${alert.acknowledged ? 'bg-neutral-50' : 'bg-white'} hover:bg-neutral-50 transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`mt-1 p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-neutral-900">
                          {alert.type.replace('_', ' ').toUpperCase()}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      
                      <p className="text-sm text-neutral-700 mb-2">{alert.message}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span>{formatTimestamp(alert.timestamp)}</span>
                        {alert.acknowledged && (
                          <span className="flex items-center gap-1 text-success-600">
                            <CheckCircle className="h-3 w-3" />
                            Acknowledged
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="ml-4 px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Alert Guidelines */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Alert Response Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-danger-50 rounded-lg border border-danger-200">
            <h4 className="font-medium text-danger-900 mb-2">High Priority</h4>
            <p className="text-sm text-danger-700">
              Immediate response required. Consider crowd control measures or UAV repositioning.
            </p>
          </div>
          
          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <h4 className="font-medium text-warning-900 mb-2">Medium Priority</h4>
            <p className="text-sm text-warning-700">
              Monitor closely. Prepare for potential escalation and notify relevant personnel.
            </p>
          </div>
          
          <div className="p-4 bg-success-50 rounded-lg border border-success-200">
            <h4 className="font-medium text-success-900 mb-2">Low Priority</h4>
            <p className="text-sm text-success-700">
              Informational alert. Log for analysis and trending purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
