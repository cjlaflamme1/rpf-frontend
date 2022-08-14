import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Text, Overlay } from 'react-native-elements';
import { dateOnly, timeOnly } from '../../helpers/timeAndDate';
import { clearSelectedRequest, getAllClimbRequestsAsync, getOneClimbRequestAsync, updateOneClimbRequestAsync } from '../../store/climbRequestSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { createClimbMeetupAsync, getAllClimbMeetupsAsync } from '../../store/climbMeetupSlice';

interface Props {};

const BrowseRequests: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [textResponse, setTextResponse] = useState('');
  const [selectResponse, setSelectResponse] = useState('');
  const dispatch = useAppDispatch();
  const currentState = useAppSelector((state) => ({
    climbRequestState: state.climbRequestState,
  }));

  useEffect(() => {
    dispatch(getAllClimbRequestsAsync());
  }, []);

  const { allClimbRequests, selectedClimbRequest } = currentState.climbRequestState;

  if (!allClimbRequests || allClimbRequests.length < 1) {
    return (
      <View>
        <Text>No Matches Found</Text>
      </View>
    )
  }

  const openMatch = async (matchId: string) => {
    await dispatch(getOneClimbRequestAsync(matchId));
    setVisible(true);
  };

  const closeMatch = () => {
    dispatch(clearSelectedRequest());
    setTextResponse('');
    setSelectResponse('')
    setVisible(false);
  };

  const submitResponse = async () => {
    if (selectedClimbRequest && selectResponse) {
      const reqResponse = await dispatch(updateOneClimbRequestAsync({
        id: selectedClimbRequest.id,
        updateBody: {
          targetMessageResponse: textResponse,
          targetAccepted: selectResponse === 'yes',
        }
      }));
      dispatch(getAllClimbRequestsAsync());
      if (reqResponse.payload.targetAccepted) {
        await dispatch(createClimbMeetupAsync({
          climbRequestId: selectedClimbRequest.id,
          userIds: [selectedClimbRequest.initiatingUser.id, selectedClimbRequest.targetUser.id],
        }));
        dispatch(getAllClimbMeetupsAsync());
      }
      closeMatch();
    }
  };

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
                  {
                    request.targetAccepted === null &&
                    <>{`From: ${request.initiatingUser.firstName} ${request.initiatingUser.lastName} for  ${dateOnly(request.initiatingEntry.startDateTime)}`}</>
                  }
                  {
                    request.targetAccepted === true &&
                    <>Request Accepted</>
                  }
                  {
                    request.targetAccepted === false &&
                    <>Request Denied</>
                  }
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
                  <Button
                    disabled={request.targetAccepted !== null}
                    onPress={() => openMatch(request.id)}
                    containerStyle={[styles.cardButton]}
                    title={
                      request.targetAccepted === null
                        ? "Respond to request"
                        : "Response submitted"
                    }
                  />
                </View>
              </Card>
            ))
          }
        </View>
        <View>
          <Overlay
              isVisible={visible}
              overlayStyle={[styles.modalContainer]}
            >
            <View>
              <View>
                {
                  selectedClimbRequest
                  && (
                    <View style={[styles.sectionContainer]}>
                      <Card containerStyle={[styles.cardContainer, { marginBottom: 15 }]} key={`${selectedClimbRequest.id}-selected`}>
                        <View style={[styles.cardContentContainer]}>
                          <View>
                            <Text>
                              {
                                `${selectedClimbRequest.initiatingUser.firstName}'s schedule:`
                              }
                            </Text>
                            <Text style={[styles.cardSection]}>
                              {`Start time: ${timeOnly(selectedClimbRequest.initiatingEntry.startDateTime)}`}
                            </Text>
                            <Text style={[styles.cardSection]}>
                              {`End Time: ${timeOnly(selectedClimbRequest.initiatingEntry.endDateTime)}`}
                            </Text>
                            <View>
                              <Text style={[styles.cardSection]}>
                                Areas:
                              </Text>
                              {
                                selectedClimbRequest.initiatingEntry
                                && selectedClimbRequest.initiatingEntry.areas
                                && selectedClimbRequest.initiatingEntry.areas.length > 0
                                && selectedClimbRequest.initiatingEntry.areas.map((area, index) => (
                                  <Text style={[styles.areaItem]} key={`${area}-${index}`}>{area}</Text>
                                ))
                              }
                            </View>
                          </View>
                          {
                            selectedClimbRequest.targetGenRequest
                            && (
                              <View>
                                <Text>
                                  {
                                    `Your schedule:`
                                  }
                                </Text>
                                <Text style={[styles.cardSection]}>
                                  {`Start time: ${selectedClimbRequest.targetGenRequest.startHour}:${selectedClimbRequest.targetGenRequest.startMinute} ${selectedClimbRequest.targetGenRequest.startAMPM}`}
                                </Text>
                                <Text style={[styles.cardSection]}>
                                  {`End Time: ${selectedClimbRequest.targetGenRequest.finishHour}:${selectedClimbRequest.targetGenRequest.startMinute} ${selectedClimbRequest.targetGenRequest.finishAMPM}`}
                                </Text>
                                <View>
                                  <Text style={[styles.cardSection]}>
                                    Areas:
                                  </Text>
                                  {
                                    selectedClimbRequest.targetGenRequest.areas.map((area, index) => (
                                      <Text style={[styles.areaItem]} key={`${area}-${index}-gen`}>{area}</Text>
                                    ))
                                  }
                                </View>
                              </View>
                            )
                          }
                          {
                            selectedClimbRequest.targetScheduledRequest
                            && (
                              <View>
                                <Text>
                                  {
                                    `Your schedule:`
                                  }
                                </Text>
                                <Text style={[styles.cardSection]}>
                                  {`Start time: ${timeOnly(selectedClimbRequest.targetScheduledRequest.startDateTime)}`}
                                </Text>
                                <Text style={[styles.cardSection]}>
                                  {`End Time: ${timeOnly(selectedClimbRequest.targetScheduledRequest.endDateTime)}`}
                                </Text>
                                <View>
                                  <Text style={[styles.cardSection]}>
                                    Areas:
                                  </Text>
                                  {
                                    selectedClimbRequest.targetScheduledRequest
                                    && selectedClimbRequest.targetScheduledRequest.areas
                                    && selectedClimbRequest.targetScheduledRequest.areas.length > 0
                                    && selectedClimbRequest.targetScheduledRequest.areas.map((area, index) => (
                                      <Text style={[styles.areaItem]} key={`${area}-${index}-sched`}>{area}</Text>
                                    ))
                                  }
                                </View>
                              </View>
                            )
                          }
                        </View>
                      </Card>
                    </View>
                  )
                }
                <View style={[styles.sectionContainer, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                  <View style={[{ flexDirection: 'row' }]}>
                    <Pressable
                      style={[styles.checkboxBase, selectResponse === 'yes' && styles.checkboxChecked]}
                      onPress={() => setSelectResponse('yes')}
                    >
                      {selectResponse === 'yes' && (<Ionicons name="checkmark" size={24} color="white" />)}
                    </Pressable>
                    <Text style={[{ textAlignVertical: 'center', alignSelf: 'center' }]}>
                      Yes
                    </Text>
                  </View>
                  <View style={[{ flexDirection: 'row' }]}>
                    <Pressable
                      style={[styles.checkboxBase, selectResponse === 'no' && styles.checkboxChecked]}
                      onPress={() => setSelectResponse('no')}
                    >
                      {selectResponse === 'no' && (<Ionicons name="checkmark" size={24} color="white" />)}
                    </Pressable>
                    <Text style={[{ textAlignVertical: 'center', alignSelf: 'center' }]}>
                      No
                    </Text>
                  </View>
                </View>
                <View style={[styles.sectionContainer, { marginBottom: 15 }]}>
                  <TextInput
                    style={[styles.textInput]}
                    value={textResponse}
                    multiline
                    onChangeText={setTextResponse}
                    keyboardType={"default"}
                    placeholder="Please enter a note here..."
                  />
                </View>
              </View>
              <View style={[styles.buttonContainer, styles.doubleButtonContainer]}>
                <Button
                  title="Cancel"
                  containerStyle={[styles.matchButton]}
                  onPress={closeMatch}
                />
                <Button
                  onPress={submitResponse}
                  containerStyle={[styles.matchButton]}
                  title="Submit"
                />
              </View>
            </View>
          </Overlay>
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
  doubleButtonContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchButton: {
    width: 150,
    maxWidth: '95%',
    margin: 10,
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
  },
  modalContainer: {
    width: '90%',
  },
  textInput: {
    width: '100%',
    minHeight: 50,
    padding: 5,
    borderWidth: 1,
  },
  dropdownSelect: {
    width: '100%',
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CC1406',
    backgroundColor: 'transparent',
    marginRight: 10,
    marginBottom: 10,
  },

  checkboxChecked: {
    backgroundColor: '#CC1406',
  },
})

export default BrowseRequests;