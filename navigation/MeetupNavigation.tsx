import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeetupLanding from '../screens/meetup/MeetupLanding';
import MeetupMessages from '../screens/meetup/MeetupMessages';
import { useAppSelector } from '../store/hooks';



const MeetupNavigation: React.FC = () => {
  const RootStack = createNativeStackNavigator();
  return (
    <>
      <RootStack.Navigator initialRouteName="Meetup Landing" >
        <RootStack.Screen
          name="Meetup Landing"
          component={MeetupLanding}
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
          name="Meetup Messages"
          component={MeetupMessages}
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
export default MeetupNavigation;