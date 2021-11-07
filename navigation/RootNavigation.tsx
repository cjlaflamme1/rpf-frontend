import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import LoginSignup from '../screens/user/LoginSignup';
import UserLanding from '../screens/user/UserLanding';


const RootStack = createNativeStackNavigator();

const RootNavigation: React.FC = () => (
  <RootStack.Navigator initialRouteName="SignIn">
    <RootStack.Screen
      name="SignIn"
      component={LoginSignup}
      options={{contentStyle: {alignItems: 'center'}}}
    />
    <RootStack.Screen
      name="User Landing"
      component={UserLanding}
      options={{ title: 'Welcome' }}
    />
  </RootStack.Navigator>
);

export default RootNavigation;