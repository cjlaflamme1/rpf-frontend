import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import { Button, Card, Overlay, Text } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { getOtherUser } from '../../api/userAPI';
import { dateOnly, timeOnly } from '../../helpers/timeAndDate';
import { ClimbAvailabilityGen } from '../../store/climbAvailabilityGenSlice';
import { ClimbAvailabilityScheduled, getAllclimbAvailabilityScheduledAsync, getOneClimbAvailScheduledAsync } from '../../store/climbAvailabilityScheduledSlice';
import { getOneClimbMeetupAsync } from '../../store/climbMeetupSlice';
import { createClimbRequestAsync } from '../../store/climbRequestSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { User } from '../../store/userSlice';
import ClimbingProfile from '../user/ClimbingProfile';
import PersonalProfile from '../user/PersonalProfile';

interface Props {
  navigation: any;
};

const ViewMatches: React.FC<Props> = ({ navigation }) => {
  const [showToast, setShowToast] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [climbingOverlay, setClimbingOverlay] = useState(false);
  const [otherUserProfile, setOtherUserProfile] = useState<User>();
  const currentState = useAppSelector((state) => ({
    climbAvailabilityScheduledState: state.climbAvailabilityScheduledState,
  }));
  const dispatch = useAppDispatch();

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const { selectedScheduledAvailability } = currentState.climbAvailabilityScheduledState;

  const updatePageData = () => {
    if (selectedScheduledAvailability) {
      dispatch(getOneClimbAvailScheduledAsync(selectedScheduledAvailability.id));
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    updatePageData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  if (
    (!selectedScheduledAvailability
    || !selectedScheduledAvailability.matches
    || selectedScheduledAvailability.matches.length <= 0) &&
    (!selectedScheduledAvailability
      || !selectedScheduledAvailability.genMatches
      || selectedScheduledAvailability.genMatches.length <= 0)
    ) {
      return (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={[{ marginTop: 20 }]}>
            <Text>No Matches Found</Text>
          </View>
        </ScrollView>
      )
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
  
  const submitSchedMatchRequest = async (match: ClimbAvailabilityScheduled) => {
    await dispatch(createClimbRequestAsync({
      initialMessage: '',
      initiatingEntryId: selectedScheduledAvailability.id,
      targetScheduledReqId: match.id,
      targetUserId: match.initialUser.id,
    }));
    dispatch(getOneClimbAvailScheduledAsync(selectedScheduledAvailability.id));
    setShowToast(true);
  };

  const submitGenMatchRequest = async (match: ClimbAvailabilityGen) => {
    await dispatch(createClimbRequestAsync({
      initialMessage: '',
      initiatingEntryId: selectedScheduledAvailability.id,
      targetGenRequestId: match.id,
      targetUserId: match.user.id,
    }));
    dispatch(getOneClimbAvailScheduledAsync(selectedScheduledAvailability.id));
    setShowToast(true);
  };
  const { matches, genMatches } = selectedScheduledAvailability;

  const viewMeetupPress = () => {
    navigation.navigate('Meetups');
  }

  const returnMatchButtonSched = (match: ClimbAvailabilityScheduled) => {
    if (
      match
      && match.incomingClimbRequests
      && match.incomingClimbRequests.length > 0
    ) {
      const presentRequest = match.incomingClimbRequests.find((req) => req.initiatingEntry.id === selectedScheduledAvailability.id);
      if (presentRequest) {
        if (presentRequest.climbMeetup) {
          return (
            <>
              {
                presentRequest.targetMessageResponse
                && (
                  <Text style={[styles.targetMessageResponse]}>
                    {presentRequest.targetMessageResponse}
                  </Text>
                )
              }
              <Button
                disabled
                containerStyle={[styles.cardButton]}
                title={"Request Accepted"}
                />
              <Button
                containerStyle={[styles.cardButton]}
                title={"View Meetup"}
                onPress={() => viewMeetupPress()}
                />
            </>
          );
        }
        if (presentRequest.targetAccepted === false) {
          return (
            <>
              {
                presentRequest.targetMessageResponse
                && (
                  <Text style={[styles.targetMessageResponse]}>
                    {presentRequest.targetMessageResponse}
                  </Text>
                )
              }
              <Button
                disabled
                containerStyle={[styles.cardButton]}
                title={"Request Denied"}
                />
            </>
          )
        }
        return (
          <Button
            disabled
            containerStyle={[styles.cardButton]}
            title={"Request Submitted"}
          />
        )
      }
    }
    if (
      match
      && match.climbRequests
      && match.climbRequests.length > 0
    ) {
      const otherUserRequested = match.climbRequests.find((req) => req.initiatingEntry && req.initiatingEntry.id === match.id);
      if (otherUserRequested) {
        return (
          <Button
            disabled
            containerStyle={[styles.cardButton]}
            title={"Other User Submitted Request"}
          />
        )
      }
    }
    return (
      <Button
        containerStyle={[styles.cardButton]}
        title={"Submit Request"}
        onPress={() => submitSchedMatchRequest(match)}
      />
    );
  };

  const returnMatchButtonGen = (match: ClimbAvailabilityGen) => {
    if (
      match
      && match.incomingClimbRequests
      && match.incomingClimbRequests.length > 0
    ) {
      const presentRequest = match.incomingClimbRequests.find((req) => req.initiatingEntry.id === selectedScheduledAvailability.id);
      if (presentRequest) {
        if (presentRequest.climbMeetup) {
          return (
            <>
              {
                presentRequest.targetMessageResponse
                && (
                  <Text style={[styles.targetMessageResponse]}>
                    {presentRequest.targetMessageResponse}
                  </Text>
                )
              }
              <Button
                disabled
                containerStyle={[styles.cardButton]}
                title={"Request Accepted"}
                />
              <Button
                containerStyle={[styles.cardButton]}
                title={"View Meetup"}
                onPress={() => viewMeetupPress()}
                />
            </>
          );
        }
        if (presentRequest.targetAccepted === false) {
          return (
            <>
              {
                presentRequest.targetMessageResponse
                && (
                  <Text style={[styles.targetMessageResponse]}>
                    {presentRequest.targetMessageResponse}
                  </Text>
                )
              }
              <Button
                disabled
                containerStyle={[styles.cardButton]}
                title={"Request Denied"}
                />
            </>
          )
        }
        return (
          <Button
            disabled
            containerStyle={[styles.cardButton]}
            title={"Request Submitted"}
            onPress={() => submitGenMatchRequest(match)}
          />
        )
      }
    }
    return (
      <Button
        containerStyle={[styles.cardButton]}
        title={"Submit Request"}
        onPress={() => submitGenMatchRequest(match)}
      />
    );
  };

  return (
    <View style={[styles.pageContainer]}>
      <Toast visible={showToast} onShow={() => setTimeout(() => setShowToast(false), 3000)}>
        Match request submitted!
      </Toast>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={[styles.sectionContainer]}>
          <Text h3>{dateOnly(selectedScheduledAvailability.startDateTime)}</Text>
        </View>
        <View style={[styles.sectionContainer]}>
          <Text h4>Scheduled Matches:</Text>
        </View>
        <View style={[styles.sectionContainer]}>
          {
            matches
            && matches.length > 0
            ? matches
              .slice()
              .map((match, index) => (
                <Card containerStyle={[styles.cardContainer]} key={`${match.id}-${index}`}>
                  <Card.Title>
                    {`${match.initialUser.firstName} ${match.initialUser.lastName}`}
                  </Card.Title>
                  <Card.Divider />
                  <View style={[styles.cardContentContainer]}>
                    <View>
                      <Text style={[styles.cardSection]}>
                        {`Start time: ${timeOnly(match.startDateTime)}`}
                      </Text>
                      <Text style={[styles.cardSection]}>
                        {`End Time: ${timeOnly(match.endDateTime)}`}
                      </Text>
                      <View>
                        <Text style={[styles.cardSection]}>
                          Areas:
                        </Text>
                        {
                          match.areas.map((area, index) => (
                            <Text style={[styles.areaItem]} key={`${area}-${index}`}>{area}</Text>
                          ))
                        }
                      </View>
                    </View>
                    <View style={[{ justifyContent: 'space-evenly', flexGrow: 1}]}>
                      <Pressable style={[styles.pressableIconContainer]} onPress={() => openProfile(match.initialUser.id)}>
                        <MaterialCommunityIcons name="face-man-outline" size={24} color={'#CC1406'} />
                        <Text style={[styles.cardSection, { marginTop: 5 }]}>Profile info</Text>
                      </Pressable>
                      <Pressable style={[styles.pressableIconContainer]} onPress={() => openClimbingProfile(match.initialUser)}>
                        <FontAwesome5 name="hand-rock" size={24} color="#CC1406" />
                        <Text style={[styles.cardSection, { marginTop: 5 }]}>Climbing info</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={[styles.sectionContainer]}>
                    {
                      returnMatchButtonSched(match)
                    }
                  </View>
                </Card>
              ))
            : (
              <Card containerStyle={[styles.cardContainer]}>
                <Card.Title>
                  No Matches Found
                </Card.Title>
              </Card>
            )
          }
        </View>
        <View style={[styles.sectionContainer]}>
          <Text h4>General Availability Matches:</Text>
        </View>
        <View style={[styles.sectionContainer]}>
        {
            genMatches
            && genMatches.length > 0
            ? genMatches
              .slice()
              .map((match, index) => (
                <Card containerStyle={[styles.cardContainer]} key={`${match.id}-${index}`}>
                  <Card.Title>
                    {`${match.user.firstName} ${match.user.lastName}`}
                  </Card.Title>
                  <Card.Divider />
                  <View style={[styles.cardContentContainer]}>
                    <View>
                      <Text style={[styles.cardSection]}>
                        {`Start Time: ${match.startHour}:${match.startMinute !== 0 ? match.startMinute : match.startMinute.toString() + '0'} ${match.startAMPM}`}
                      </Text>
                      <Text style={[styles.cardSection]}>
                        {`End Time: ${match.finishHour}:${match.finishMinute !== 0 ? match.finishMinute : match.finishMinute.toString() + '0'} ${match.finishAMPM}`}
                      </Text>
                      <View>
                        <Text style={[styles.cardSection]}>
                          Areas:
                        </Text>
                        {
                          match.areas.map((area, index) => (
                            <Text style={[styles.areaItem]} key={`${area}-${index}`}>{area}</Text>
                          ))
                        }
                      </View>
                    </View>
                    <View style={[{ justifyContent: 'space-evenly', flexGrow: 1}]}>
                      <Pressable style={[styles.pressableIconContainer]} onPress={() => openProfile(match.user.id)}>
                        <MaterialCommunityIcons name="face-man-outline" size={24} color={'#CC1406'} />
                        <Text style={[styles.cardSection, { marginTop: 5 }]}>Profile info</Text>
                      </Pressable>
                      <Pressable style={[styles.pressableIconContainer]} onPress={() => openClimbingProfile(match.user)}>
                        <FontAwesome5 name="hand-rock" size={24} color="#CC1406" />
                        <Text style={[styles.cardSection, { marginTop: 5 }]}>Climbing info</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={[styles.sectionContainer]}>
                    {
                      returnMatchButtonGen(match)
                    }
                  </View>
                </Card>
              ))
            : (
              <Card containerStyle={[styles.cardContainer]}>
                <Card.Title>
                  No Matches Found
                </Card.Title>
              </Card>
            )
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
    // justifyContent: 'space-evenly',
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
  },
  pressableIconContainer: {
    marginTop: 10,
    alignItems: 'center'
  },
  targetMessageResponse: {
    margin: 10,
  }
})

export default ViewMatches;