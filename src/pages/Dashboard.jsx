import React from 'react';
import StatusCards from '../components/Dashboard/StatusCards';
import VideoFeed from '../components/Dashboard/VideoFeed';
import MapView from '../components/Dashboard/MapView';

function Dashboard() {
  return (
    <div className="space-y-6">
      <StatusCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoFeed />
        </div>
        <div>
          <MapView />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
