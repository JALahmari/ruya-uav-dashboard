import React from 'react';
import { Bell, Wifi, Battery, Signal } from 'lucide-react';
import { useSystem } from '../../contexts/SystemContext';

function Header() {
  const { uavStatus, alerts } = useSystem();
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged).length;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">UAV Mission Control</h1>
          <p className="text-sm text-neutral-600">Real-time crowd monitoring and analytics</p>
        </div>

        <div className="flex items-center gap-6">
          {/* System Status Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi className={`h-4 w-4 ${uavStatus.connected ? 'text-success-500' : 'text-danger-500'}`} />
              <span className="text-xs text-neutral-600">Connection</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Battery className={`h-4 w-4 ${uavStatus.battery > 20 ? 'text-success-500' : 'text-danger-500'}`} />
              <span className="text-xs text-neutral-600">{uavStatus.battery}%</span>
            </div>

            <div className="flex items-center gap-2">
              <Signal className={`h-4 w-4 ${uavStatus.gpsLock ? 'text-success-500' : 'text-warning-500'}`} />
              <span className="text-xs text-neutral-600">GPS</span>
            </div>
          </div>

          {/* Alert Notifications */}
          <div className="relative">
            <Bell className={`h-5 w-5 ${unacknowledgedAlerts > 0 ? 'text-danger-500' : 'text-neutral-400'}`} />
            {unacknowledgedAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unacknowledgedAlerts}
              </span>
            )}
          </div>

          {/* Current Time */}
          <div className="text-sm text-neutral-600">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
