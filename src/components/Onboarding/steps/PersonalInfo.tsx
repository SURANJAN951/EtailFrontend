import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface PersonalInfoProps {
  data: {
    name: string;
    email: string;
  };
  updateData: (data: { name: string; email: string }) => void;
  onNext?: () => void;
}

export interface PersonalInfoRef {
  validateAndProceed: () => void;
}

const PersonalInfo = forwardRef<PersonalInfoRef, PersonalInfoProps>(({ data, updateData, onNext }, ref) => {
  const [errors, setErrors] = useState<{ email?: string }>({});
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
    if (name === 'email' && errors.email) {
      setErrors({});
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Expose validation function to parent using ref
  useImperativeHandle(ref, () => ({
    validateAndProceed: () => {
      if (!validateEmail(data.email)) {
        setErrors({ email: 'Please enter a valid email address' });
        return;
      }

      setErrors({});
      if (onNext) onNext();
    }
  }));

  return (
    <div className="space-y-6 dark:text-dark-text">
      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">Personal Information</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
            className="onboarding-input mt-1 transition-colors duration-200"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            className={`onboarding-input mt-1 transition-colors duration-200 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="john@example.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default PersonalInfo;
