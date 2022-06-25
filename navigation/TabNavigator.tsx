import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserLanding from '../screens/user/UserLanding';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileNavigation from './ProfileNavigation';
import CalendarNavigation from './CalendarNavigation';
import Settings from '../screens/settings/Settings';
import SettingsNavigation from './SettingsNavigation';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons focused={focused} name="face-man-outline" size={size} color={color} />
          },
          headerShown: false,
        }}
        
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarNavigation}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons focused={focused} name="calendar" size={size} color={color} />
          },
          headerShown: false,
        }}
        
      />
      <Tab.Screen
        name="Settings Navigation"
        component={SettingsNavigation}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="settings" focused={focused} size={size} color={color} />
          },
          headerShown: false,
        }}
        
      />
    </Tab.Navigator>
  )
};

export default TabNavigator;