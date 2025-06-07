import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface BusinessInfoProps {
  data: {
    companyName: string;
    industry: string;
    size: string;
  };
  updateData: (data: { companyName: string; industry: string; size: string }) => void;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6 dark:text-dark-text">
      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">Business Information</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Company Name
          </label>
          <input
              type="text"
              id="companyName"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              className="onboarding-input mt-1 transition-colors duration-200"
              placeholder="Acme Inc."
              required
            />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Industry
          </label>
          <select
              id="industry"
              name="industry"
              value={data.industry}
              onChange={handleChange}
              className="onboarding-input mt-1 transition-colors duration-200"
              required
            >
            <option value="">Select an industry</option>
            <option value="technology">Technology</option>
            <option value="retail">Retail</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Company Size
          </label>
          <select
              id="size"
              name="size"
              value={data.size}
              onChange={handleChange}
              className="onboarding-input mt-1 transition-colors duration-200"
              required
            >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501+">501+ employees</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;