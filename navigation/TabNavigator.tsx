import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserLanding from '../screens/user/UserLanding';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={UserLanding}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons focused={focused} name="face-profile" size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
};

export default TabNavigator;