import React, { useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface PreferencesProps {
  data: {
    theme: string;
    defaultLayout: string;
  };
  updateData: (data: { theme: string; defaultLayout: string }) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ data, updateData }) => {
  const { setTheme } = useTheme();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
    
    // If theme is changed, update it in the ThemeContext
    if (name === 'theme' && (value === 'light' || value === 'dark')) {
      setTheme(value);
    }
  };
  
  // Set theme when component mounts
  useEffect(() => {
    if (data.theme === 'light' || data.theme === 'dark') {
      setTheme(data.theme);
    }
  }, []);

  return (
    <div className="space-y-6 dark:text-dark-text">
      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">Your Preferences</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
            Theme
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative flex cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={data.theme === 'light'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`
                flex-1 p-4 border rounded-lg text-center
                ${data.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                dark:border-dark-border dark:text-dark-text
              `}>
                <span className="text-sm font-medium">Light Mode</span>
              </div>
            </label>
            <label className="relative flex cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={data.theme === 'dark'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`
                flex-1 p-4 border rounded-lg text-center
                ${data.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                dark:border-dark-border dark:text-dark-text
              `}>
                <span className="text-sm font-medium">Dark Mode</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;