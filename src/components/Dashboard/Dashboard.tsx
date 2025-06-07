import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const mockData = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 7 },
  { name: 'Thu', value: 5 },
  { name: 'Fri', value: 8 },
  { name: 'Sat', value: 6 },
  { name: 'Sun', value: 9 }
];

const Dashboard = () => {
  const { userData } = useUser();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to onboarding if no user data
    if (!userData) {
      navigate('/onboarding');
      return;
    }
    
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 1000);
  }, [userData, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-6 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
            Welcome back, {userData?.personal?.name || 'User'}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {userData?.business?.companyName} - {userData?.business?.industry}
          </p>
        </div>
      </header>

      {/* Personal Details Card */}
      <div className="dashboard-card mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Personal Details</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</h4>
            <p className="text-base text-gray-900 dark:text-dark-text">{userData?.personal?.name || 'Not provided'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</h4>
            <p className="text-base text-gray-900 dark:text-dark-text">{userData?.personal?.email || 'Not provided'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</h4>
            <p className="text-base text-gray-900 dark:text-dark-text">{userData?.business?.companyName || 'Not provided'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Industry</h4>
            <p className="text-base text-gray-900 dark:text-dark-text">{userData?.business?.industry || 'Not provided'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Size</h4>
            <p className="text-base text-gray-900 dark:text-dark-text">{userData?.business?.size || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Team Members</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Active members</p>
        </div>

        <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Active Projects</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>In progress</p>
        </div>

        <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
          <p className="text-3xl font-bold text-purple-600">5</p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Unread messages</p>
        </div>
      </div>

      {/* Chart */}
      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="name" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme === 'dark' ? '#60A5FA' : '#3B82F6'}
                strokeWidth={2}
                dot={{ fill: theme === 'dark' ? '#60A5FA' : '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;