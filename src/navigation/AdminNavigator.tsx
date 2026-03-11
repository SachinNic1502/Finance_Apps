import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme';

import AdminDashboard from '../screens/admin/AdminDashboard';
import DealersScreen from '../screens/admin/DealersScreen';
import ApplicationsScreen from '../screens/admin/ApplicationsScreen';
import CustomersScreen from '../screens/admin/CustomersScreen';
import ReportsScreen from '../screens/admin/ReportsScreen';
import ProfileScreen from '../screens/admin/ProfileScreen';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Dealers':
              iconName = 'people';
              break;
            case 'Applications':
              iconName = 'assignment';
              break;
            case 'Customers':
              iconName = 'person';
              break;
            case 'Reports':
              iconName = 'bar-chart';
              break;
            case 'Profile':
              iconName = 'account-circle';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={AdminDashboard}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Dealers" 
        component={DealersScreen}
        options={{ title: 'Dealers' }}
      />
      <Tab.Screen 
        name="Applications" 
        component={ApplicationsScreen}
        options={{ title: 'Applications' }}
      />
      <Tab.Screen 
        name="Customers" 
        component={CustomersScreen}
        options={{ title: 'Customers' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{ title: 'Reports' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigator;
