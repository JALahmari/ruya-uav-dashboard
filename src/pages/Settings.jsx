import React, { useState } from 'react';
import { Save, Bell, Shield, Camera, Sliders, UserPlus, Trash2, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Settings() {
  const { addOperator, removeOperator, getOperators, user } = useAuth();
  const [operators, setOperators] = useState(getOperators());

  const [settings, setSettings] = useState({
    crowdThreshold: 70,
    alertFrequency: 5,
    videoQuality: 'high',
    autoRecord: true,
    emailAlerts: true,
    smsAlerts: false,
    encryptData: true,
    logRetention: 30
  });

  // Operator management state
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [newOperator, setNewOperator] = useState({
    username: '',
    password: '',
    name: ''
  });
  const [operatorError, setOperatorError] = useState('');
  const [operatorSuccess, setOperatorSuccess] = useState('');

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulate saving settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddOperator = (e) => {
    e.preventDefault();
    setOperatorError('');
    setOperatorSuccess('');

    // Validation
    if (!newOperator.username || !newOperator.password || !newOperator.name) {
      setOperatorError('All fields are required');
      return;
    }

    if (newOperator.username.length < 3) {
      setOperatorError('Username must be at least 3 characters');
      return;
    }

    if (newOperator.password.length < 6) {
      setOperatorError('Password must be at least 6 characters');
      return;
    }

    const result = addOperator(newOperator);
    
    if (result.success) {
      setOperatorSuccess(`Operator "${newOperator.name}" added successfully!`);
      setNewOperator({ username: '', password: '', name: '' });
      setShowAddOperator(false);
      setOperators(getOperators());
      setTimeout(() => setOperatorSuccess(''), 3000);
    } else {
      setOperatorError(result.error);
    }
  };

  const handleRemoveOperator = (username) => {
    if (window.confirm(`Are you sure you want to remove operator "${username}"?`)) {
      const result = removeOperator(username);
      
      if (result.success) {
        setOperatorSuccess(`Operator "${username}" removed successfully!`);
        setOperators(getOperators());
        setTimeout(() => setOperatorSuccess(''), 3000);
      } else {
        setOperatorError(result.error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">System Settings</h1>
          <p className="text-neutral-600">Configure system parameters and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            saved 
              ? 'bg-success-600 text-white' 
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <Save className="h-4 w-4" />
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      {/* Only show operator management for admin users */}
      {user?.role === 'admin' && (
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-neutral-900">Operator Management</h3>
            </div>
            <button
              onClick={() => setShowAddOperator(!showAddOperator)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              Add Operator
            </button>
          </div>

          {/* Success/Error Messages */}
          {operatorSuccess && (
            <div className="mb-4 p-3 bg-success-50 border border-success-200 rounded-lg text-success-700">
              {operatorSuccess}
            </div>
          )}
          
          {operatorError && (
            <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-700">
              {operatorError}
            </div>
          )}

          {/* Add Operator Form */}
          {showAddOperator && (
            <form onSubmit={handleAddOperator} className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-medium text-neutral-900 mb-4">Add New Operator</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newOperator.name}
                    onChange={(e) => setNewOperator({ ...newOperator, name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newOperator.username}
                    onChange={(e) => setNewOperator({ ...newOperator, username: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="johndoe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newOperator.password}
                    onChange={(e) => setNewOperator({ ...newOperator, password: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors"
                >
                  Create Operator
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddOperator(false);
                    setNewOperator({ username: '', password: '', name: '' });
                    setOperatorError('');
                  }}
                  className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Operators List */}
          <div className="space-y-3">
            {operators.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <Users className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
                <p>No operators found. Add your first operator above.</p>
              </div>
            ) : (
              operators.map((op) => (
                <div key={op.username} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {op.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">{op.name}</div>
                      <div className="text-sm text-neutral-500">@{op.username}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveOperator(op.username)}
                    className="flex items-center gap-2 px-3 py-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Settings */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-neutral-900">Detection Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Crowd Density Threshold (%)
              </label>
              <input
                type="range"
                min="30"
                max="90"
                value={settings.crowdThreshold}
                onChange={(e) => handleChange('crowdThreshold', parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>30%</span>
                <span className="font-medium">{settings.crowdThreshold}%</span>
                <span>90%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Video Quality
              </label>
              <select
                value={settings.videoQuality}
                onChange={(e) => handleChange('videoQuality', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="low">720p (Low)</option>
                <option value="medium">1080p (Medium)</option>
                <option value="high">1080p (High)</option>
                <option value="ultra">4K (Ultra)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700">
                Auto-record missions
              </label>
              <button
                onClick={() => handleChange('autoRecord', !settings.autoRecord)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoRecord ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoRecord ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Alert Settings */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-neutral-900">Alert Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Alert Check Frequency (seconds)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.alertFrequency}
                onChange={(e) => handleChange('alertFrequency', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700">
                Email alerts
              </label>
              <button
                onClick={() => handleChange('emailAlerts', !settings.emailAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailAlerts ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700">
                SMS alerts
              </label>
              <button
                onClick={() => handleChange('smsAlerts', !settings.smsAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.smsAlerts ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-neutral-900">Security Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700">
                Encrypt stored data
              </label>
              <button
                onClick={() => handleChange('encryptData', !settings.encryptData)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.encryptData ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.encryptData ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Log Retention (days)
              </label>
              <select
                value={settings.logRetention}
                onChange={(e) => handleChange('logRetention', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={7}>7 days</option>
                <option value={15}>15 days</option>
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-neutral-900">System Performance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-700">CPU Usage</span>
                <span className="text-sm text-neutral-600">45%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-700">Memory Usage</span>
                <span className="text-sm text-neutral-600">62%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-warning-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-700">Storage Usage</span>
                <span className="text-sm text-neutral-600">28%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-neutral-700 mb-2">Software Version</h4>
            <p className="text-neutral-600">Ru'ya Monitor v2.1.0</p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 mb-2">Last Update</h4>
            <p className="text-neutral-600">December 15, 2024</p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 mb-2">License</h4>
            <p className="text-neutral-600">Enterprise License</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
