import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLanding from '../screens/user/UserLanding';
import PersonalProfile from '../screens/user/PersonalProfile';
import ClimbingProfile from '../screens/user/ClimbingProfile';
import Settings from '../screens/settings/Settings';



const SettingsNavigation: React.FC = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <>
      <RootStack.Navigator initialRouteName="Settings Landing" >
        <RootStack.Screen
          name="Settings"
          component={Settings}
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
export default SettingsNavigation;