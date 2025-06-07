import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';
import PersonalInfo from './steps/PersonalInfo';
import BusinessInfo from './steps/BusinessInfo';
import Preferences from './steps/Preferences';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: ''
    },
    businessInfo: {
      companyName: '',
      industry: '',
      size: ''
    },
    preferences: {
      theme: 'light',
      defaultLayout: 'grid'
    }
  });

  const updateFormData = (step: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step as keyof typeof prev], ...data }
    }));
  };

  // Create a ref to access the PersonalInfo component's validation method
  const personalInfoRef = React.useRef<{ validateAndProceed: () => void } | null>(null);

  const handleNext = () => {
    // If we're on the first step (Personal Info), trigger validation in the component
    if (currentStep === 1 && personalInfoRef.current) {
      personalInfoRef.current.validateAndProceed();
      return;
    }
    // For other steps, proceed normally
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Format the data to match the UserData interface
    const userData = {
      personal: {
        name: formData.personalInfo.name,
        email: formData.personalInfo.email,
      },
      business: {
        companyName: formData.businessInfo.companyName,
        industry: formData.businessInfo.industry,
        size: formData.businessInfo.size,
      },
      preferences: {
        theme: formData.preferences.theme as 'light' | 'dark',
        defaultLayout: formData.preferences.defaultLayout as 'grid' | 'list',
      },
    };
    
    // Save all form data to context
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfo
            ref={personalInfoRef}
            data={formData.personalInfo}
            updateData={(data) => updateFormData('personalInfo', data)}
            onNext={() => setCurrentStep(prev => prev + 1)}
          />
        );
      case 2:
        return (
          <BusinessInfo
            data={formData.businessInfo}
            updateData={(data) => updateFormData('businessInfo', data)}
          />
        );
      case 3:
        return (
          <Preferences
            data={formData.preferences}
            updateData={(data) => updateFormData('preferences', data)}
          />
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-dark-card p-8 rounded-xl shadow-lg dark:shadow-gray-900">
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-dark-text">
            Welcome to eTail
          </h2>
          
          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                Step {currentStep} of 3
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                  {Math.round((currentStep / 3) * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <div
                style={{ width: `${(currentStep / 3) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400 transition-all duration-500"
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mt-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="btn-secondary transition-colors duration-200"
              >
                Back
              </button>
            )}
            <div className="flex-grow"></div>
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="btn-primary transition-colors duration-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary transition-colors duration-200"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;