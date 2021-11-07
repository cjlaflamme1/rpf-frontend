import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import LoginSignup from '../screens/user/LoginSignup';
import UserLanding from '../screens/user/UserLanding';
import SignUp from '../screens/user/SignUp';


const RootStack = createNativeStackNavigator();

const RootNavigation: React.FC = () => (
  <RootStack.Navigator initialRouteName="SignIn/SignUp">
    <RootStack.Screen
      name="SignIn/SignUp"
      component={LoginSignup}
      options={
        {
          contentStyle:
          {
            alignItems: 'center'
          },
          title: 'Welcome',
        }
      }

    />
    <RootStack.Screen
      name="SignUp"
      component={SignUp}
      options={
        {
          contentStyle:
          {
            alignItems: 'center'
          },
          title: 'Rumney Partner Finder'
        }
      }
    />
    <RootStack.Screen
      name="User Landing"
      component={UserLanding}
      options={{ title: 'Welcome' }}
    />
  </RootStack.Navigator>
);

export default RootNavigation;