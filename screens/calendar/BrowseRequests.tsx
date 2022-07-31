import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Text } from 'react-native-elements';
import { dateOnly, timeOnly } from '../../helpers/timeAndDate';
import { getAllClimbRequestsAsync } from '../../store/climbRequestSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface Props {};

const BrowseRequests: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState('');
  const dispatch = useAppDispatch();
  const currentState = useAppSelector((state) => ({
    climbRequestState: state.climbRequestState,
  }));

  useEffect(() => {
    dispatch(getAllClimbRequestsAsync());
  }, []);

  const { allClimbRequests } = currentState.climbRequestState;

  if (!allClimbRequests || allClimbRequests.length < 1) {
    return (
      <View>
        <Text>No Matches Found</Text>
      </View>
    )
  }

  return (
    <View>
      <ScrollView>
        <Calendar
          style={[styles.calendar]}
        />
        <View style={[styles.sectionContainer]}>
          {
            allClimbRequests
            .slice()
            .sort((a, b) => a.createdAt.valueOf() < b.createdAt.valueOf() ? -1 : 1)
            .map((request, index) => (
              <Card containerStyle={[styles.cardContainer]} key={`${request.id}-${index}`}>
                <Card.Title>
                  {`From: ${request.initiatingUser.firstName} ${request.initiatingUser.lastName} for  ${dateOnly(request.initiatingEntry.startDateTime)}`}
                </Card.Title>
                <Card.Divider />
                <View style={[styles.cardContentContainer]}>
                  <View>
                    <Text>
                      {
                        `${request.initiatingUser.firstName}'s schedule:`
                      }
                    </Text>
                    <Text style={[styles.cardSection]}>
                      {`Start time: ${timeOnly(request.initiatingEntry.startDateTime)}`}
                    </Text>
                    <Text style={[styles.cardSection]}>
                      {`End Time: ${timeOnly(request.initiatingEntry.endDateTime)}`}
                    </Text>
                    <View>
                      <Text style={[styles.cardSection]}>
                        Areas:
                      </Text>
                      {
                        request.initiatingEntry.areas.map((area, index) => (
                          <Text style={[styles.areaItem]} key={`${area}-${index}`}>{area}</Text>
                        ))
                      }
                    </View>
                  </View>
                  {
                    request.targetGenRequest
                    && (
                      <View>
                        <Text>
                          {
                            `Your schedule:`
                          }
                        </Text>
                        <Text style={[styles.cardSection]}>
                          {`Start time: ${request.targetGenRequest.startHour}:${request.targetGenRequest.startMinute} ${request.targetGenRequest.startAMPM}`}
                        </Text>
                        <Text style={[styles.cardSection]}>
                          {`End Time: ${request.targetGenRequest.finishHour}:${request.targetGenRequest.startMinute} ${request.targetGenRequest.finishAMPM}`}
                        </Text>
                        <View>
                          <Text style={[styles.cardSection]}>
                            Areas:
                          </Text>
                          {
                            request.targetGenRequest.areas.map((area, index) => (
                              <Text style={[styles.areaItem]} key={`${area}-${index}-gen`}>{area}</Text>
                            ))
                          }
                        </View>
                      </View>
                    )
                  }
                  {
                    request.targetScheduledRequest
                    && (
                      <View>
                        <Text>
                          {
                            `Your schedule:`
                          }
                        </Text>
                        <Text style={[styles.cardSection]}>
                          {`Start time: ${timeOnly(request.targetScheduledRequest.startDateTime)}`}
                        </Text>
                        <Text style={[styles.cardSection]}>
                          {`End Time: ${timeOnly(request.targetScheduledRequest.endDateTime)}`}
                        </Text>
                        <View>
                          <Text style={[styles.cardSection]}>
                            Areas:
                          </Text>
                          {
                            request.targetScheduledRequest.areas.map((area, index) => (
                              <Text style={[styles.areaItem]} key={`${area}-${index}-sched`}>{area}</Text>
                            ))
                          }
                        </View>
                      </View>
                    )
                  }
                </View>
                <View style={[styles.sectionContainer]}>
                  {/* <Button
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
                  /> */}
                </View>
              </Card>
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  calendar: {
    minWidth: '95%',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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

export default BrowseRequests;