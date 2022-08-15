import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLanding from '../screens/user/UserLanding';
import PersonalProfile from '../screens/user/PersonalProfile';
import ClimbingProfile from '../screens/user/ClimbingProfile';



const ProfileNavigation: React.FC = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <>
      <RootStack.Navigator initialRouteName="Profile Landing" >
        <RootStack.Screen
          name="Profile Landing"
          component={UserLanding}
          options={
            {
              contentStyle:
              {
                alignItems: 'center'
              },
            }
          }
        />
        <RootStack.Screen
          name="Personal Profile"
          component={PersonalProfile}
          options={
            {
              contentStyle:
              {
                alignItems: 'center'
              },
            }
          }
        />
        <RootStack.Screen
          name="Climbing Profile"
          component={ClimbingProfile}
          options={
            {
              contentStyle:
              {
                alignItems: 'center'
              },
            }
          }
        />
      </RootStack.Navigator >
    </>
  );
}
export default ProfileNavigation;