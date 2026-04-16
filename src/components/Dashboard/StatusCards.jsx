import React from 'react';
import { TrendingUp, Users, AlertTriangle, Navigation } from 'lucide-react';
import { useSystem } from '../../contexts/SystemContext';

function StatusCards() {
  const { crowdData, uavStatus, flightStatus, missionTime } = useSystem();

  const formatMissionTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'text-success-500 bg-success-50 border-success-200';
      case 'warning': return 'text-warning-500 bg-warning-50 border-warning-200';
      case 'danger': return 'text-danger-500 bg-danger-50 border-danger-200';
      default: return 'text-neutral-500 bg-neutral-50 border-neutral-200';
    }
  };

  const statusCards = [
    {
      title: 'Crowd Density',
      value: `${Math.round(crowdData.currentDensity)}%`,
      subtitle: `Threshold: ${crowdData.threshold}%`,
      icon: TrendingUp,
      status: crowdData.status,
      trend: crowdData.currentDensity > crowdData.threshold ? '+12%' : '-5%'
    },
    {
      title: 'Total People',
      value: crowdData.totalPeople.toLocaleString(),
      subtitle: `${crowdData.detectedAreas} areas detected`,
      icon: Users,
      status: crowdData.totalPeople > 200 ? 'warning' : 'safe',
      trend: '+8%'
    },
    {
      title: 'Alert Status',
      value: crowdData.status === 'safe' ? 'All Clear' : 'Active',
      subtitle: crowdData.status === 'safe' ? 'No alerts' : 'Attention required',
      icon: AlertTriangle,
      status: crowdData.status,
      trend: crowdData.status === 'safe' ? 'Normal' : 'High'
    },
    {
      title: 'Flight Status',
      value: flightStatus === 'active' ? 'Flying' : 'Grounded',
      subtitle: flightStatus === 'active' ? formatMissionTime(missionTime) : 'Ready',
      icon: Navigation,
      status: flightStatus === 'active' ? 'safe' : 'neutral',
      trend: `Alt: ${Math.round(uavStatus.altitude)}m`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statusCards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(card.status)}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              card.trend.includes('+') ? 'text-success-600 bg-success-50' : 
              card.trend.includes('-') ? 'text-danger-600 bg-danger-50' : 
              'text-neutral-600 bg-neutral-50'
            }`}>
              {card.trend}
            </span>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-neutral-600">{card.title}</h3>
            <div className="text-2xl font-bold text-neutral-900">{card.value}</div>
            <p className="text-xs text-neutral-500">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatusCards;
