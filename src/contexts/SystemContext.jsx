import React, { createContext, useContext, useState, useEffect } from 'react';

const SystemContext = createContext();

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystem must be used within a SystemProvider");
  }
  return context;
};

export const SystemProvider = ({ children }) => {
  const [uavStatus, setUavStatus] = useState({
    connected: true,
    battery: 78,
    altitude: 120,
    speed: 15.5,
    gpsLock: true,
    coordinates: { lat: 24.4539, lng: 54.3773 }
  });

  const [crowdData, setCrowdData] = useState({
    currentDensity: 45,
    threshold: 70,
    status: 'safe',
    detectedAreas: 12,
    totalPeople: 156
  });

  const [alerts, setAlerts] = useState([]);
  const [flightStatus, setFlightStatus] = useState('active');
  const [missionTime, setMissionTime] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update crowd data
      setCrowdData(prev => {
        const newDensity = Math.max(0, Math.min(100, prev.currentDensity + (Math.random() - 0.5) * 10));
        const newStatus = newDensity > prev.threshold ? 'danger' : newDensity > prev.threshold * 0.8 ? 'warning' : 'safe';
        
        // Generate alert if density exceeds threshold
        if (newDensity > prev.threshold && prev.currentDensity <= prev.threshold) {
          const newAlert = {
            id: Date.now(),
            type: 'crowd_density',
            message: `Crowd density exceeded threshold: ${Math.round(newDensity)}%`,
            timestamp: new Date().toISOString(),
            acknowledged: false,
            severity: 'high'
          };
          setAlerts(currentAlerts => [newAlert, ...currentAlerts.slice(0, 9)]);
        }

        return {
          ...prev,
          currentDensity: newDensity,
          status: newStatus,
          detectedAreas: Math.max(1, prev.detectedAreas + Math.floor((Math.random() - 0.5) * 3)),
          totalPeople: Math.max(0, prev.totalPeople + Math.floor((Math.random() - 0.5) * 20))
        };
      });

      // Update UAV status
      setUavStatus(prev => ({
        ...prev,
        battery: Math.max(0, prev.battery - 0.1),
        altitude: Math.max(50, Math.min(200, prev.altitude + (Math.random() - 0.5) * 5)),
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 2)
      }));

      // Update mission time
      if (flightStatus === 'active') {
        setMissionTime(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [flightStatus]);

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const startMission = () => {
    setFlightStatus('active');
    setMissionTime(0);
  };

  const endMission = () => {
    setFlightStatus('completed');
  };

  const emergencyLand = () => {
    setFlightStatus('emergency_landing');
  };

  const value = {
    uavStatus,
    crowdData,
    alerts,
    flightStatus,
    missionTime,
    acknowledgeAlert,
    clearAllAlerts,
    startMission,
    endMission,
    emergencyLand,
    setUavStatus,
    setCrowdData
  };

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
};
