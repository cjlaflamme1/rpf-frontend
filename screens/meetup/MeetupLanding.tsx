import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Overlay, Text } from 'react-native-elements';
import { getOtherUser } from '../../api/userAPI';
import { dateOnly } from '../../helpers/timeAndDate';
import { getAllClimbMeetupsAsync, getOneClimbMeetupAsync } from '../../store/climbMeetupSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { User } from '../../store/userSlice';
import ClimbingProfile from '../user/ClimbingProfile';
import PersonalProfile from '../user/PersonalProfile';

interface Props {
  navigation: any;
};

const MeetupLanding: React.FC<Props> = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [climbingOverlay, setClimbingOverlay] = useState(false);
  const [otherUserProfile, setOtherUserProfile] = useState<User>();
  const currentState = useAppSelector((state) => ({
    climbMeetupState: state.climbMeetupState,
    userState: state.userState,
  }));
  const dispatch = useAppDispatch();

  const { allClimbMeetups } = currentState.climbMeetupState;
  const { currentUser } = currentState.userState;

  useEffect(() => {
    dispatch(getAllClimbMeetupsAsync());
  }, []);

  const viewMeetupMessages = async (meetupId: string, userName: string) => {
    await dispatch(getOneClimbMeetupAsync(meetupId));
    navigation.navigate('Meetup Messages', { name: userName })
  }

  const openProfile = async (userProfileId: string) => {
    const res = await getOtherUser(userProfileId).catch((e) => console.log(e));
    if (res && res.data) {
      setOtherUserProfile(res.data);
    }
    setVisible(true);
  };

  const closeProfile = () => {
    setOtherUserProfile(undefined);
    setVisible(false);
  }

  const openClimbingProfile = (userProfile: User) => {
    setOtherUserProfile(userProfile);
    setClimbingOverlay(true);
  }

  const closeClimbingProfile = () => {
    setOtherUserProfile(undefined);
    setClimbingOverlay(false);
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
                      {meetup.climbDate && dateOnly(meetup.climbDate)}
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
                        onPress={() => {
                          const otherUser = meetup.users.find((user) => user.id !== currentUser.id);
                          if (otherUser) {
                            openProfile(otherUser.id);
                          }
                        }}
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
                        onPress={() => {
                          const otherUser = meetup.users.find((user) => user.id !== currentUser.id);
                          if (otherUser) {
                            openClimbingProfile(otherUser);
                          }
                        }}
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
        <View>
          <Overlay
            onBackdropPress={closeProfile}
            isVisible={visible}
            overlayStyle={[styles.modalContainer]}
          >
            <PersonalProfile otherUser={otherUserProfile} />
          </Overlay>
        </View>
        <View>
          <Overlay
            onBackdropPress={closeClimbingProfile}
            isVisible={climbingOverlay}
            overlayStyle={[styles.modalContainer]}
          >
            <ClimbingProfile otherUser={otherUserProfile} />
          </Overlay>
        </View>
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