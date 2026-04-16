import React, { useState } from 'react';
import { Play, Square, AlertTriangle, Navigation, Battery, Wifi, MapPin } from 'lucide-react';
import { useSystem } from '../contexts/SystemContext';

function FlightControl() {
  const { uavStatus, flightStatus, missionTime, startMission, endMission, emergencyLand } = useSystem();
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const waypoints = [
    { id: 1, name: 'Takeoff Point', lat: 24.4539, lng: 54.3773, alt: 50 },
    { id: 2, name: 'Survey Area A', lat: 24.4545, lng: 54.3780, alt: 120 },
    { id: 3, name: 'Survey Area B', lat: 24.4551, lng: 54.3787, alt: 120 },
    { id: 4, name: 'Survey Area C', lat: 24.4557, lng: 54.3794, alt: 120 },
    { id: 5, name: 'Landing Point', lat: 24.4563, lng: 54.3801, alt: 50 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Flight Control Center</h1>
          <p className="text-neutral-600">Monitor and control UAV missions in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            flightStatus === 'active' ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              flightStatus === 'active' ? 'bg-success-500' : 'bg-neutral-400'
            }`}></div>
            <span className="text-sm font-medium capitalize">{flightStatus}</span>
          </div>
        </div>
      </div>

      {/* Mission Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Flight Status */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Mission Status</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="text-2xl font-bold text-neutral-900">{formatTime(missionTime)}</div>
                <div className="text-xs text-neutral-600">Flight Time</div>
              </div>
              
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="text-2xl font-bold text-neutral-900">{Math.round(uavStatus.altitude)}m</div>
                <div className="text-xs text-neutral-600">Altitude</div>
              </div>
              
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="text-2xl font-bold text-neutral-900">{uavStatus.speed.toFixed(1)}</div>
                <div className="text-xs text-neutral-600">Speed (m/s)</div>
              </div>
              
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="text-2xl font-bold text-neutral-900">{uavStatus.battery}%</div>
                <div className="text-xs text-neutral-600">Battery</div>
              </div>
            </div>

            {/* Mission Controls */}
            <div className="flex items-center gap-4">
              {flightStatus !== 'active' ? (
                <button
                  onClick={startMission}
                  className="flex items-center gap-2 px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  Start Mission
                </button>
              ) : (
                <>
                  <button
                    onClick={endMission}
                    className="flex items-center gap-2 px-6 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                  >
                    <Square className="h-4 w-4" />
                    End Mission
                  </button>
                  <button
                    onClick={emergencyLand}
                    className="flex items-center gap-2 px-6 py-3 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Emergency Land
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Flight Path */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Flight Path Planning</h3>
            
            <div className="bg-neutral-100 rounded-lg h-64 p-4 mb-4">
              {/* Simulated Flight Path Map */}
              <div 
                className="w-full h-full rounded bg-cover bg-center relative"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop")'
                }}
              >
                <div className="absolute inset-0 bg-primary-900/30">
                  {waypoints.map((waypoint, index) => (
                    <div
                      key={waypoint.id}
                      className={`absolute w-4 h-4 rounded-full cursor-pointer ${
                        selectedWaypoint === waypoint.id ? 'bg-danger-500' : 'bg-primary-500'
                      }`}
                      style={{ 
                        left: `${15 + index * 18}%`, 
                        top: `${30 + Math.sin(index) * 15}%` 
                      }}
                      onClick={() => setSelectedWaypoint(waypoint.id)}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                  
                  {/* Flight path line */}
                  <svg className="absolute inset-0 w-full h-full">
                    <polyline
                      points={waypoints.map((_, i) => `${15 + i * 18}%,${30 + Math.sin(i) * 15}%`).join(' ')}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Waypoint Details */}
            {selectedWaypoint && (
              <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                {(() => {
                  const waypoint = waypoints.find(w => w.id === selectedWaypoint);
                  return waypoint ? (
                    <div>
                      <h4 className="font-medium text-primary-900 mb-2">{waypoint.name}</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-primary-600">Latitude:</span>
                          <div className="font-mono">{waypoint.lat.toFixed(4)}</div>
                        </div>
                        <div>
                          <span className="text-primary-600">Longitude:</span>
                          <div className="font-mono">{waypoint.lng.toFixed(4)}</div>
                        </div>
                        <div>
                          <span className="text-primary-600">Altitude:</span>
                          <div className="font-mono">{waypoint.alt}m</div>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>

        {/* System Status Panel */}
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">System Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${uavStatus.connected ? 'text-success-500' : 'text-danger-500'}`} />
                  <span className="text-sm">Connection</span>
                </div>
                <span className={`text-sm font-medium ${
                  uavStatus.connected ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {uavStatus.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className={`h-4 w-4 ${uavStatus.battery > 20 ? 'text-success-500' : 'text-danger-500'}`} />
                  <span className="text-sm">Battery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        uavStatus.battery > 50 ? 'bg-success-500' :
                        uavStatus.battery > 20 ? 'bg-warning-500' : 'bg-danger-500'
                      }`}
                      style={{ width: `${uavStatus.battery}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{uavStatus.battery}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className={`h-4 w-4 ${uavStatus.gpsLock ? 'text-success-500' : 'text-warning-500'}`} />
                  <span className="text-sm">GPS Lock</span>
                </div>
                <span className={`text-sm font-medium ${
                  uavStatus.gpsLock ? 'text-success-600' : 'text-warning-600'
                }`}>
                  {uavStatus.gpsLock ? 'Locked' : 'Searching'}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Procedures */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Emergency Procedures</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-danger-200 rounded-lg hover:bg-danger-50 transition-colors">
                <div className="font-medium text-danger-900">Return to Home</div>
                <div className="text-xs text-danger-600">Activate RTH mode</div>
              </button>
              
              <button className="w-full text-left p-3 border border-warning-200 rounded-lg hover:bg-warning-50 transition-colors">
                <div className="font-medium text-warning-900">Hold Position</div>
                <div className="text-xs text-warning-600">Maintain current position</div>
              </button>
              
              <button className="w-full text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                <div className="font-medium text-neutral-900">Manual Control</div>
                <div className="text-xs text-neutral-600">Switch to manual mode</div>
              </button>
            </div>
          </div>

          {/* Pre-flight Checklist */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Pre-flight Checklist</h3>
            
            <div className="space-y-2 text-sm">
              {[
                'Battery level > 30%',
                'GPS signal locked',
                'Camera operational',
                'Communication link stable',
                'Weather conditions acceptable',
                'Airspace clearance obtained'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightControl;
