import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserData {
  personal?: {
    name: string;
    email: string;
  };
  business?: {
    companyName: string;
    industry: string;
    size: string;
  };
  preferences?: {
    theme: 'light' | 'dark';
    defaultLayout: 'grid' | 'list';
  };
}

interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    // Try to get user data from localStorage on initial load
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  // Save userData to localStorage whenever it changes
  React.useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };