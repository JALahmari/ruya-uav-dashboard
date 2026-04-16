import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, Radar, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login, user } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(credentials);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center p-8">
        <div className="max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <Radar className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold">Ru'ya</h1>
              <p className="text-primary-200">UAV Crowd Detection System</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Advanced Aerial Monitoring</h2>
              <p className="text-primary-100 leading-relaxed">
                Real-time crowd density analysis using cutting-edge AI technology. 
                Monitor, analyze, and respond to crowd dynamics with precision and reliability.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                <span className="text-sm">Real-time video processing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                <span className="text-sm">AI-powered crowd detection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                <span className="text-sm">Advanced alert system</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h2>
            <p className="text-neutral-600">Please sign in to access the monitoring dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-2">Demo Credentials</h3>
            <div className="text-sm text-neutral-600 space-y-1">
              <div>Admin: username "admin" / password "admin123"</div>
              <div>Operator: username "operator" / password "op123"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
