import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { dateOnly, timeOnly } from '../../helpers/timeAndDate';
import { ClimbAvailabilityGen } from '../../store/climbAvailabilityGenSlice';
import { ClimbAvailabilityScheduled } from '../../store/climbAvailabilityScheduledSlice';
import { createClimbRequestAsync } from '../../store/climbRequestSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface Props { };

const ViewMatches: React.FC<Props> = () => {
  const [showToast, setShowToast] = useState(false);
  const currentState = useAppSelector((state) => ({
    climbAvailabilityScheduledState: state.climbAvailabilityScheduledState,
  }));
  const dispatch = useAppDispatch();

  const { selectedScheduledAvailability } = currentState.climbAvailabilityScheduledState;

  
  if (
    (!selectedScheduledAvailability
    || !selectedScheduledAvailability.matches
    || selectedScheduledAvailability.matches.length <= 0) &&
    (!selectedScheduledAvailability
      || !selectedScheduledAvailability.genMatches
      || selectedScheduledAvailability.genMatches.length <= 0)
    ) {
      return (
        <View>
          <Text>No Matches Found</Text>
        </View>
    );
  }
  
  const submitSchedMatchRequest = async (match: ClimbAvailabilityScheduled) => {
    await dispatch(createClimbRequestAsync({
      initialMessage: '',
      initiatingEntryId: selectedScheduledAvailability.id,
      targetScheduledReqId: match.id,
      targetUserId: match.initialUser.id,
    }));
    setShowToast(true);
  };

  const submitGenMatchRequest = async (match: ClimbAvailabilityGen) => {
    await dispatch(createClimbRequestAsync({
      initialMessage: '',
      initiatingEntryId: selectedScheduledAvailability.id,
      targetGenRequestId: match.id,
      targetUserId: match.user.id,
    }));
    setShowToast(true);
  };
  const { matches, genMatches } = selectedScheduledAvailability;

  return (
    <View style={[styles.pageContainer]}>
      <Toast visible={showToast} onShow={() => setTimeout(() => setShowToast(false), 3000)}>
        Match request submitted!
      </Toast>
      <ScrollView>
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
                    <View>
                      <Text style={[styles.cardSection]}>Icon</Text>
                      <Text style={[styles.cardSection]}>{`${match.initialUser.firstName} ${match.initialUser.lastName}`}</Text>
                      <Text style={[styles.cardSection]}>Link to Profile info</Text>
                      <Text style={[styles.cardSection]}>Link to Climbing info</Text>
                    </View>
                  </View>
                  <View style={[styles.sectionContainer]}>
                    <Button
                      disabled={
                        (match
                        && match.incomingClimbRequests
                        && match.incomingClimbRequests.length > 0
                        && match.incomingClimbRequests.find((req) => req.initiatingEntry.id === selectedScheduledAvailability.id))
                          ? true
                          : false
                      }
                      containerStyle={[styles.cardButton]}
                      title={
                        (match
                          && match.incomingClimbRequests
                          && match.incomingClimbRequests.length > 0
                          && match.incomingClimbRequests.find((req) => req.initiatingEntry.id === selectedScheduledAvailability.id))
                            ? 'Request submitted'
                            : 'Submit request'
                      }
                      onPress={() => submitSchedMatchRequest(match)}
                    />
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
                    <View>
                      <Text style={[styles.cardSection]}>Icon</Text>
                      <Text style={[styles.cardSection]}>{`${match.user.firstName} ${match.user.lastName}`}</Text>
                      <Text style={[styles.cardSection]}>Link to Profile info</Text>
                      <Text style={[styles.cardSection]}>Link to Climbing info</Text>
                    </View>
                  </View>
                  <View style={[styles.sectionContainer]}>
                    <Button
                      disabled={
                        (match
                        && match.incomingClimbRequests
                        && match.incomingClimbRequests.length > 0
                        && match.incomingClimbRequests.find((req) => req.initiatingEntry.id === selectedScheduledAvailability.id))
                          ? true
                          : false
                      }
                      containerStyle={[styles.cardButton]}
                      title={
                        (match
                          && match.incomingClimbRequests
                          && match.incomingClimbRequests.length > 0
                          && match.incomingClimbRequests.find((req) => req.initiatingEntry.id === selectedScheduledAvailability.id))
                            ? 'Request submitted'
                            : 'Submit request'
                      }
                      onPress={() => submitGenMatchRequest(match)}
                    />
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
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 10,
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

export default ViewMatches;