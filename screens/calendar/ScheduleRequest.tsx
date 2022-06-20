import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import { Button, ListItem, Overlay, Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { ScheduledAvailabilityModel } from '../../models/ScheduledAvailability';
import { createClimbAvailabilityScheduledAsync, deleteOneScheduledAvailAsync, getAllclimbAvailabilityScheduledAsync, getOneClimbAvailScheduledAsync, updateOneScheduledAvailAsync } from '../../store/climbAvailabilityScheduledSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { daysOfWeek } from '../../assets/calendarVars/daysOfWeek';
import { climbingAreas } from '../../assets/climbingVars/climbingAreas';

interface Props {};

const ScheduleRequest: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState('');
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState('');
  const [newDateStep, setNewDateStep] = useState(0);
  const dispatch = useAppDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [areas, setAreas] = useState<string[]>([]);

  const currentState = useAppSelector((state) => ({
    climbAvailabilityScheduledState: state.climbAvailabilityScheduledState,
  }));

  useEffect(() => {
    dispatch(getAllclimbAvailabilityScheduledAsync());
  }, []);

  const { allScheduledAvailability, selectedScheduledAvailability } = currentState.climbAvailabilityScheduledState;

  const openOverlay = () => {
    setVisible(true);
  }

  const editGenAvail = async (id: string) => {
    const incomingAvail= await dispatch(getOneClimbAvailScheduledAsync(id));
    if (incomingAvail.payload) {
      setEditId(incomingAvail.payload.id);
      setSelectedDate(new Date(incomingAvail.payload.startDateTime));
      setSelectedStartTime(new Date(incomingAvail.payload.startDateTime));
      setSelectedEndTime(new Date(incomingAvail.payload.endDateTime));
      if (incomingAvail.payload.areas) {
        setAreas(incomingAvail.payload.areas.slice());
      }
    }
    openOverlay();
  }

  const closeOverlay = () => {
    setNewDateStep(0);
    setEditId('');
    setSelectedDate(new Date());
    setSelectedStartTime(new Date());
    setSelectedEndTime(new Date());
    setAreas([]);
    setVisible(false);
  }

  const submitAvailability = async () => {
    const newAvail: ScheduledAvailabilityModel = {
      startDateTime: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedStartTime.getHours(),
        selectedDate.getMinutes(),
      ),
      endDateTime: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedEndTime.getHours(),
        selectedEndTime.getMinutes(),
      ),
      areas,
    }
    if (!editId) {
      await dispatch(createClimbAvailabilityScheduledAsync(newAvail))
    } else if (editId) {
      await dispatch(updateOneScheduledAvailAsync({id: editId, updateBody: newAvail}));
    }
    dispatch(getAllclimbAvailabilityScheduledAsync());
    closeOverlay();
  }

  const deleteAvailability = async (id: string) => {
    await dispatch(deleteOneScheduledAvailAsync(id));
    dispatch(getAllclimbAvailabilityScheduledAsync());
  }

  return (
    <View>
      <ScrollView>
        <Calendar
          style={[styles.calendar]}
        />
        <View style={[styles.buttonContainer]}>
          <Button
            title="Add New Date"
            buttonStyle={[styles.buttonStyle]}
            onPress={openOverlay}
          />
        </View>
        <View style={[styles.accordionContainer]}>
          {
            allScheduledAvailability
            && allScheduledAvailability.length > 0
            && allScheduledAvailability
            .slice()
            .sort((a, b) => a.startDateTime.valueOf() < b.startDateTime.valueOf() ? -1 : 1)
            .map((availability, index) => (
              <ListItem.Accordion
                key={`${availability.id}-${index}`}
                style={[styles.accordion]}
                isExpanded={expanded === availability.id}
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
                onPress={() => setExpanded(availability.id)}
                content={
                  <>
                    <ListItem.Content style={[styles.accordion]}>
                      <ListItem.Title>
                        <Text>
                          {new Date(availability.startDateTime).toLocaleDateString()}
                        </Text>
                      </ListItem.Title>
                    </ListItem.Content>
                  </>
                }
              >
                <ListItem
                  style={[styles.accordionItem]}
                  containerStyle={[styles.accordionItem]}
                  hasTVPreferredFocus={undefined}
                  tvParallaxProperties={undefined}
                >
                  <ListItem.Content>
                    <View style={[styles.accordionCard]}>
                      <View>
                        <Text>
                          {new Date(availability.startDateTime).toLocaleTimeString()}–{new Date(availability.endDateTime).toLocaleTimeString()}
                        </Text>
                        <View>
                          {
                            availability.areas
                            && availability.areas.length > 0
                            && availability.areas.map((area, index) => (
                              <Text key={`${area}-${index}`}>{area}</Text>
                            ))
                          }
                        </View>
                      </View>
                      <View style={[styles.cardButtons]}>
                        <FontAwesome
                          style={[styles.cardIcon]}
                          name="edit"
                          size={24}
                          color="black"
                          onPress={() => editGenAvail(availability.id)}
                        />
                        <FontAwesome
                          style={[styles.cardIcon]}
                          name="trash-o"
                          size={24}
                          color="black"
                          onPress={() => deleteAvailability(availability.id)}
                        />
                      </View>
                    </View>
                  </ListItem.Content>
                </ListItem>
              </ListItem.Accordion>
            ))
          }
        </View>
        <View>
          <Overlay
            isVisible={visible}
            overlayStyle={[styles.modalContainer]}
          >
            <ScrollView>

              <View>
                <Text
                  h3
                  style={[styles.textCenter, styles.modalTitle]}
                >
                  Select Availability
                </Text>
                  {
                    newDateStep === 0
                    && (
                      <View>
                        <Text h4 style={[styles.textCenter]}>
                          Date
                        </Text>
                        <View style={[styles.dateContainer]}>
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={selectedDate ? new Date(selectedDate) : new Date()}
                            minimumDate={new Date()}
                            mode={'date'}
                            is24Hour={true}
                            onChange={(value) => {
                              if (value.nativeEvent.timestamp) {
                                setSelectedDate(new Date(value.nativeEvent.timestamp));
                              }
                            }}
                          />
                        </View>
                      </View>
                    )
                  }
                  {
                    newDateStep === 1
                    && (
                      <View>
                        <Text h4 style={[styles.textCenter]}>
                          Start Time
                        </Text>
                        <View style={[styles.dateContainer]}>
                          <DateTimePicker
                            testID="timepick"
                            value={selectedStartTime ? new Date(selectedStartTime) : new Date()}
                            mode={'time'}
                            is24Hour={true}
                            onChange={(value) => {
                              if (value.nativeEvent.timestamp) {
                                setSelectedStartTime(new Date(value.nativeEvent.timestamp));
                              }
                            }}
                          />
                        </View>
                      </View>
                    )
                  }
                  {
                    newDateStep === 2
                    && (
                      <View>
                        <Text h4 style={[styles.textCenter]}>
                          End Time
                        </Text>
                        <View style={[styles.dateContainer]}>
                          <DateTimePicker
                            testID="endtimepick"
                            value={selectedEndTime ? new Date(selectedEndTime) : new Date()}
                            mode={'time'}
                            is24Hour={true}
                            onChange={(value) => {
                              if (value.nativeEvent.timestamp) {
                                setSelectedEndTime(new Date(value.nativeEvent.timestamp));
                              }
                            }}
                          />
                        </View>
                      </View>
                    )
                  }
                  {
                    newDateStep === 3
                    && (
                      <View>
                        <Text h4 style={[styles.textCenter]}>
                          Areas
                        </Text>
                        <View>
                          {
                            climbingAreas.map((area) => (
                              <ListItem
                                hasTVPreferredFocus={undefined}
                                tvParallaxProperties={undefined}
                                key={`areas-${area}`}
                              >
                                <ListItem.CheckBox
                                  checked={areas && areas.length > 0 ? areas.includes(area) : false}
                                  onIconPress={() => {
                                    if (areas.includes(area)) {
                                      const newList = areas.filter((item) => item !== area);
                                      setAreas(newList);
                                    } else {
                                      setAreas([area, ...areas]);
                                    }
                                  }}
                                />
                                <ListItem.Content>
                                  <ListItem.Title>
                                    <Text>
                                      {area}
                                    </Text>
                                  </ListItem.Title>
                                </ListItem.Content>
                              </ListItem>
                            ))
                          }
                        </View>
                      </View>
                    )
                  }
              </View>
              <View style={[styles.modalButtonContainer]}>
                <Button
                  buttonStyle={[styles.modalButton]}
                  title="Cancel"
                  onPress={closeOverlay}
                />
                <Button
                  buttonStyle={[styles.modalButton]}
                  title={newDateStep <= 2 ? 'Next' : 'Save'}
                  onPress={() => {
                    if (newDateStep <= 2) {
                      setNewDateStep(newDateStep + 1);
                    } else {
                      submitAvailability();
                    }
                  }}
                />
              </View>
            </ScrollView>
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
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordionContainer: {
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: 20,
    minWidth: '50%',
  },
  accordion: {
    width: '100%',
  },
  accordionItem: {
    width: '100%',
  },
  accordionCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButtons: {
    flexDirection: 'row',
  },
  cardIcon: {
    marginRight: 10,
  },
  modalContainer: {
    width: '90%',
    minHeight: '50%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalButton: {
    minWidth: 100,
  },
  textCenter: {
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 5,
  },
  dateContainer: {
    width: 100,
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
})

export default ScheduleRequest;