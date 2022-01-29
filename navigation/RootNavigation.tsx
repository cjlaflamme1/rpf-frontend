import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import LoginSignup from '../screens/user/LoginSignup';
import UserLanding from '../screens/user/UserLanding';
import SignUp from '../screens/user/SignUp';
import { useAppSelector } from '../store/hooks';
import TabNavigator from './TabNavigator';
import SignIn from '../screens/user/SignIn';



const RootNavigation: React.FC = () => {
  const RootStack = createNativeStackNavigator();
  const currentState = useAppSelector((state) => ({
    authState: state.authState,
  }));
  const { currentAuth } = currentState.authState;
  return (
    <>
      {
        !currentAuth || !currentAuth.loggedIn ? (
          <RootStack.Navigator initialRouteName="SignIn/SignUp" >
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
              name="SignIn"
              component={SignIn}
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
          </RootStack.Navigator >

        ) : (
        <RootStack.Navigator initialRouteName="UserTabNavigator">
          <RootStack.Screen
              name="UserTabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
        </RootStack.Navigator>
      )
      }
    </>
  );
}
export default RootNavigation;