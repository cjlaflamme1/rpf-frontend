import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Text } from 'react-native-elements';
import { dateOnly } from '../../helpers/timeAndDate';
import { getOneClimbMeetupAsync } from '../../store/climbMeetupSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface Props {
  navigation: any;
};

const MeetupLanding: React.FC<Props> = ({ navigation }) => {
  const currentState = useAppSelector((state) => ({
    climbMeetupState: state.climbMeetupState,
    userState: state.userState,
  }));
  const dispatch = useAppDispatch();

  const { allClimbMeetups } = currentState.climbMeetupState;
  const { currentUser } = currentState.userState;

  const viewMeetupMessages = async (meetupId: string, userName: string) => {
    await dispatch(getOneClimbMeetupAsync(meetupId));
    navigation.navigate('Meetup Messages', { name: userName })
  }

  if (!currentUser) {
    return (<View />)
  }
  return (
    <View style={[styles.pageContainer]}>
      <ScrollView>
        <View style={[styles.sectionContainer]}>
          {
            allClimbMeetups
            && allClimbMeetups.length > 0
            && allClimbMeetups.map((meetup, index) => (
              <Card containerStyle={[styles.cardContainer]} key={`${meetup.id}-${index}`}>
                    <Card.Title>
                      { meetup.climbRequest?.initiatingEntry?.startDateTime && dateOnly(meetup.climbRequest?.initiatingEntry?.startDateTime)}
                    </Card.Title>
                    <Card.Divider />
                    <View>
                      <Text style={[styles.cardSection, { textAlign: 'center' }]} h4>{`${
                        meetup.users.find((user) => user.id !== currentUser.id)?.firstName
                        } ${meetup.users.find((user) => user.id !== currentUser.id)?.lastName}`}</Text>
                    </View>
                    <View style={[styles.sectionContainer]}>
                      <Button
                        containerStyle={[styles.cardButton]}
                        title={
                          meetup.users.find((user) => user.id !== currentUser.id)
                          && (
                            `${meetup.users.find((user) => user.id !== currentUser.id)?.firstName}'s Personal Profile`
                          )
                        }
                      />
                    </View>
                    <View style={[styles.sectionContainer]}>
                      <Button
                        containerStyle={[styles.cardButton]}
                        title={
                          meetup.users.find((user) => user.id !== currentUser.id)
                          && (
                            `${meetup.users.find((user) => user.id !== currentUser.id)?.firstName}'s Climbing Profile`
                          )
                        }
                      />
                    </View>
                    <View style={[styles.sectionContainer]}>
                      <Button
                        containerStyle={[styles.cardButton]}
                        title={"Messages"}
                        onPress={() => viewMeetupMessages(meetup.id, meetup.users.find((user) => user.id !== currentUser.id)?.firstName || 'Meetup Messages')}
                      />
                    </View>
                  </Card>
            ))
          }
        </View>
        {/* <Calendar
          style={[styles.calendar]}
        /> */}
        {/* <View style={[styles.buttonContainer]}>
          <Button
            title="General Availability"
            buttonStyle={[styles.buttonStyle]}
            onPress={() => navigation.navigate('General Availability')}
          />
          <Button
            title="Schedule Request"
            buttonStyle={[styles.buttonStyle]}
            onPress={() => navigation.navigate('Schedule Request')}
          />
          <Button
            title="Browse Requests"
            buttonStyle={[styles.buttonStyle]}
            onPress={() => navigation.navigate('Browse Requests')}
          />
        </View> */}
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 10,
  },
  modalContainer: {
    width: '90%',
  },
  sectionContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    minWidth: '95%',
    maxWidth: '95%'
  },
  cardContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButton: {
    width: '100%',
    marginTop: 5,
  },
  cardSection: {
    marginTop: 3,
  },
  areaItem: {
    marginLeft: 5,
  }
})

export default MeetupLanding;