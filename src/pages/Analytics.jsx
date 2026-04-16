import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';

function Analytics() {
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data for charts
  const densityData = [
    { time: '00:00', density: 12, people: 45 },
    { time: '02:00', density: 8, people: 30 },
    { time: '04:00', density: 15, people: 58 },
    { time: '06:00', density: 25, people: 95 },
    { time: '08:00', density: 45, people: 180 },
    { time: '10:00', density: 65, people: 250 },
    { time: '12:00', density: 80, people: 320 },
    { time: '14:00', density: 75, people: 300 },
    { time: '16:00', density: 60, people: 240 },
    { time: '18:00', density: 85, people: 340 },
    { time: '20:00', density: 70, people: 280 },
    { time: '22:00', density: 35, people: 140 }
  ];

  const alertData = [
    { name: 'High Density', value: 35, color: '#ef4444' },
    { name: 'Medium Density', value: 45, color: '#f59e0b' },
    { name: 'Low Density', value: 20, color: '#10b981' }
  ];

  const hourlyDetections = [
    { hour: '06:00', detections: 12 },
    { hour: '08:00', detections: 28 },
    { hour: '10:00', detections: 45 },
    { hour: '12:00', detections: 67 },
    { hour: '14:00', detections: 89 },
    { hour: '16:00', detections: 76 },
    { hour: '18:00', detections: 92 },
    { hour: '20:00', detections: 54 },
    { hour: '22:00', detections: 23 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Analytics Dashboard</h1>
          <p className="text-neutral-600">Crowd density trends and detection analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Peak Density</p>
              <p className="text-2xl font-bold text-neutral-900">85%</p>
            </div>
            <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-danger-500 rounded"></div>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Occurred at 18:00</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Avg Density</p>
              <p className="text-2xl font-bold text-neutral-900">48%</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-warning-500 rounded"></div>
            </div>
          </div>
          <p className="text-xs text-success-600 mt-2">↓ 12% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Detections</p>
              <p className="text-2xl font-bold text-neutral-900">486</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-success-500 rounded"></div>
            </div>
          </div>
          <p className="text-xs text-success-600 mt-2">↑ 8% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Flight Hours</p>
              <p className="text-2xl font-bold text-neutral-900">12.5h</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary-500 rounded"></div>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">3 missions completed</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Crowd Density Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={densityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="density" 
                stroke="#0ea5e9" 
                fill="#0ea5e9" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Density Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alertData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {alertData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">People Count Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={densityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="people" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Hourly Detections</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyDetections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="detections" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">Recent Mission Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Mission ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Max Density
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Alerts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {[1, 2, 3, 4, 5].map((mission) => (
                <tr key={mission} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    MSN-{mission.toString().padStart(3, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    Dec {15 - mission}, 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {2 + mission}h 30m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {Math.floor(Math.random() * 40 + 40)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {Math.floor(Math.random() * 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
