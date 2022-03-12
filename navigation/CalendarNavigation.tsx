import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLanding from '../screens/user/UserLanding';
import PersonalProfile from '../screens/user/PersonalProfile';
import ClimbingProfile from '../screens/user/ClimbingProfile';
import CalendarLanding from '../screens/calendar/CalendarLanding';
import GeneralAvailability from '../screens/calendar/GeneralAvailability';
import ScheduleRequest from '../screens/calendar/ScheduleRequest';
import BrowseRequests from '../screens/calendar/BrowseRequests';



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
        <RootStack.Screen
          name="General Availability"
          component={GeneralAvailability}
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
          name="Schedule Request"
          component={ScheduleRequest}
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
          name="Browse Requests"
          component={BrowseRequests}
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