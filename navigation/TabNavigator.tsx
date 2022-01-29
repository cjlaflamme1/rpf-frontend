import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import UserLanding from '../screens/user/UserLanding';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UserLanding" component={UserLanding} />
    </Tab.Navigator>
  )
};

export default TabNavigator;