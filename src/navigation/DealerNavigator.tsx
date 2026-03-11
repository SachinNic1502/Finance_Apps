import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme';

import DealerDashboard from '../screens/dealer/DealerDashboard';
import NewLoanScreen from '../screens/dealer/NewLoanScreen';
import DealerCustomersScreen from '../screens/dealer/DealerCustomersScreen';
import DealerApplicationsScreen from '../screens/dealer/DealerApplicationsScreen';
import DealerProfileScreen from '../screens/dealer/DealerProfileScreen';

const Tab = createBottomTabNavigator();

const DealerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'NewLoan':
              iconName = 'add-circle';
              break;
            case 'Customers':
              iconName = 'people';
              break;
            case 'Applications':
              iconName = 'assignment';
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
        component={DealerDashboard}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="NewLoan" 
        component={NewLoanScreen}
        options={{ title: 'New Loan' }}
      />
      <Tab.Screen 
        name="Customers" 
        component={DealerCustomersScreen}
        options={{ title: 'Customers' }}
      />
      <Tab.Screen 
        name="Applications" 
        component={DealerApplicationsScreen}
        options={{ title: 'Applications' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={DealerProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default DealerNavigator;
