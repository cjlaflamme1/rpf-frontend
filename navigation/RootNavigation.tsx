import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignup from '../screens/user/LoginSignup';
import SignUp from '../screens/user/SignUp';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import TabNavigator from './TabNavigator';
import SignIn from '../screens/user/SignIn';
import { getCurrentUserAsync } from '../store/userSlice';
import { loginAction } from '../store/authSlice';



const RootNavigation: React.FC = () => {
  const RootStack = createNativeStackNavigator();
  const currentState = useAppSelector((state) => ({
    authState: state.authState,
    userState: state.userState,
  }));
  const dispatch = useAppDispatch();
  const { currentAuth } = currentState.authState;

  const checkUser = async () => {
    try {
      const loginStatus = await dispatch(getCurrentUserAsync());
      if (loginStatus.payload.email) {
        dispatch(loginAction({
          loggedIn: true,
          email: loginStatus.payload.email,
          accessToken: null,
        }))
      }
    } catch (e: any) {
      return e;
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

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