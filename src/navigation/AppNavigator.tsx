import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator';
import DealerNavigator from './DealerNavigator';
import { AuthContext } from '../context/AuthContext';

const AppNavigator = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  if (user?.role === 'admin') {
    return <AdminNavigator />;
  }

  return <DealerNavigator />;
};

export default AppNavigator;
