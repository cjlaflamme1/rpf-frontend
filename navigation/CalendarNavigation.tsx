import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLanding from '../screens/user/UserLanding';
import PersonalProfile from '../screens/user/PersonalProfile';
import ClimbingProfile from '../screens/user/ClimbingProfile';
import CalendarLanding from '../screens/calendar/CalendarLanding';



const CalendarNavigation: React.FC = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <>
      <RootStack.Navigator initialRouteName="Calendar Landing" >
        <RootStack.Screen
          name="Calendar Landing"
          component={CalendarLanding}
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
export default CalendarNavigation;