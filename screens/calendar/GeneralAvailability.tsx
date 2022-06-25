import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, ListItem, Overlay, Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { daysOfWeek } from '../../assets/calendarVars/daysOfWeek';
import { GeneralAvailabilityModel } from '../../models/GeneralAvailability';
import { climbingAreas } from '../../assets/climbingVars/climbingAreas';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createClimbAvailabilityGenAsync, deleteOneGenAvailAsync, getAllClimbAvailabilityGenAsync, getOneClimbAvailGenAsync, updateOneGenAvailAsync } from '../../store/climbAvailabilityGenSlice';

interface Props { };

const GeneralAvailability: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState('');
  const [visible, setVisible] = useState(false);
  const [newGenAvail, setNewGenAvail ] = useState<GeneralAvailabilityModel>();
  const [editId, setEditId] = useState('');
  const dispatch = useAppDispatch();
  
  const currentState = useAppSelector((state) => ({
    climbAvailabilityGenState: state.climbAvailabilityGenState,
  }));

  const { allClimbGenAvailability, selectedClimbGenAvailability } = currentState.climbAvailabilityGenState;

  useEffect(() => {
    dispatch(getAllClimbAvailabilityGenAsync());
    if (!newGenAvail) {
      setNewGenAvail({
        day: 'Monday',
        startHour: 9,
        startMinute: 0,
        startAMPM: 'AM',
        finishHour: 1,
        finishMinute: 0,
        finishAMPM: 'PM',
        areas: [],
      })
    }
  }, []);

  const [newDateStep, setNewDateStep] = useState(0);
  const openOverlay = () => {
    setVisible(true);
  }

  const editGenAvail = async (id: string) => {
    const incomingAvail= await dispatch(getOneClimbAvailGenAsync(id));
    if (incomingAvail.payload) {
      setEditId(incomingAvail.payload.id);
      setNewGenAvail({
        day: incomingAvail.payload.day,
        startHour: incomingAvail.payload.startHour,
        startMinute: incomingAvail.payload.startMinute,
        startAMPM: incomingAvail.payload.startAMPM,
        finishHour: incomingAvail.payload.finishHour,
        finishMinute: incomingAvail.payload.finishMinute,
        finishAMPM: incomingAvail.payload.finishAMPM,
        areas: incomingAvail.payload.areas && incomingAvail.payload.areas.length > 0 
          ? incomingAvail.payload.areas.slice()
          : [],
      })
    }
    openOverlay();
  }

  const closeOverlay = () => {
    setNewDateStep(0);
    setEditId('');
    setNewGenAvail({
      day: 'Monday',
      startHour: 9,
      startMinute: 0,
      startAMPM: 'AM',
      finishHour: 1,
      finishMinute: 0,
      finishAMPM: 'PM',
      areas: [],
    })
    setVisible(false);
  }

  const submitAvailability = async () => {
    if (newGenAvail && !editId) {
      await dispatch(createClimbAvailabilityGenAsync(newGenAvail))
    } else if (newGenAvail && editId) {
      await dispatch(updateOneGenAvailAsync({id: editId, updateBody: newGenAvail}));
    }
    dispatch(getAllClimbAvailabilityGenAsync());
    closeOverlay();
  }

  const deleteAvailability = async (id: string) => {
    await dispatch(deleteOneGenAvailAsync(id));
    dispatch(getAllClimbAvailabilityGenAsync());
  }

  const returnCalendarMarks = () => {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth());
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, (currentMonth + 1), 0).getDate();
    const returnObject: any = {};
    if (allClimbGenAvailability && allClimbGenAvailability.length > 0) {
      for (let i = 0; daysInMonth > i; i++) {
        const dayOfWeek = new Date(currentYear, currentMonth, (i + 1));
        const matchedDays = allClimbGenAvailability.filter((avail) => avail.day === daysOfWeek[dayOfWeek.getDay()]);
        if (matchedDays && matchedDays.length > 0) {
          const formattedDate = `${currentYear}-${(currentMonth + 1).toLocaleString('en-US', {minimumIntegerDigits: 2})}-${(i + 1).toLocaleString('en-US', {minimumIntegerDigits: 2})}`;
          matchedDays.map((matchedAvail) => {
            returnObject[formattedDate] = { dotColor: 'green', marked: true }
          })
        }
      }
    }
    return  returnObject;
  };

  return (
    <View>
      <ScrollView>
        <Calendar
          hideExtraDays
          hideArrows
          markedDates={returnCalendarMarks()}
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
            allClimbGenAvailability
            && allClimbGenAvailability.length > 0
            && allClimbGenAvailability
            .slice()
            .sort((a, b) => {
              const day1 = daysOfWeek.indexOf(a.day);
              const day2 = daysOfWeek.indexOf(b.day);
              if (day1 < day2) {
                return -1;
              }
              return 1;
            })
            .map((availability, index) => (
              <ListItem.Accordion
                key={`${availability.id}-${index}`}
                style={[styles.accordion]}
                isExpanded={expanded === availability.id}
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
                onPress={() => {
                  if (expanded === availability.id) {
                    setExpanded('');
                  } else {
                    setExpanded(availability.id)
                  }
                }}
                content={
                  <>
                    <ListItem.Content style={[styles.accordion]}>
                      <ListItem.Title>
                        <Text>
                          { availability.day }
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
                          {`${availability.startHour}:${availability.startMinute} ${availability.startAMPM} – ${availability.finishHour}:${availability.startMinute} ${availability.finishAMPM}`}
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
                  Select General Availability
                </Text>
                  {
                    newGenAvail
                    && newDateStep === 0
                    && (
                      <View>
                        <Text h4 style={[styles.textCenter]}>
                          Day of week
                        </Text>
                        <View>
                          <Picker
                            selectedValue={newGenAvail.day || ''}
                            onValueChange={(itemValue: string) => setNewGenAvail({ ...newGenAvail, day: itemValue})}
                          >
                            {
                              daysOfWeek.map((day) => (
                                <Picker.Item key={`day-${day}`} label={day} value={day} />
                              ))
                            }
                          </Picker>
                        </View>
                      </View>
                    )
                  }
                  {
                    newGenAvail
                    && newDateStep === 1
                    && (
                      <View>
                        <Text h4 style={[styles.textCenter]}>
                          Start Time
                        </Text>
                        <View style={[styles.multiDropdown]}>
                          <Picker
                            style={[styles.multiDropdownItem]}
                            selectedValue={newGenAvail.startHour || 1}
                            onValueChange={(itemValue: number) => setNewGenAvail({ ...newGenAvail, startHour: itemValue })}
                          >
                            {
                              [...Array(12).keys()].map((hour) => (
                                <Picker.Item
                                  key={`hour=${hour}`}
                                  label={`${hour + 1}`}
                                  value={hour + 1}
                                />
                              ))
                            }
                          </Picker>
                          <Picker
                            style={[styles.multiDropdownItem]}
                            selectedValue={newGenAvail.startMinute || 0}
                            onValueChange={(itemValue: number) => setNewGenAvail({ ...newGenAvail, startMinute: itemValue })}
                          >
                            {
                              [0, 15, 30, 45].map((minute) => (
                                <Picker.Item
                                  key={`minute-${minute}`}
                                  label={minute <= 8 ? `0${minute}` : `${minute}`}
                                  value={minute}
                                />
                              ))
                            }
                          </Picker>
                          <Picker
                            style={[styles.multiDropdownItem]}
                            selectedValue={newGenAvail.startAMPM || 'AM'}
                            onValueChange={(itemValue: 'AM' | 'PM') => setNewGenAvail({ ...newGenAvail, startAMPM: itemValue })}
                          >
                            {
                              ['AM', 'PM'].map((val) => (
                                <Picker.Item
                                  key={`ampm-${val}`}
                                  label={val}
                                  value={val}
                                />
                              ))
                            }
                          </Picker>
                        </View>
                      </View>
                    )
                  }
                  {
                    newGenAvail
                    && newDateStep === 2
                    && (
                      <View>
                        <Text h4 style={[styles.textCenter]}>
                          End Time
                        </Text>
                        <View style={[styles.multiDropdown]}>
                          <Picker
                            style={[styles.multiDropdownItem]}
                            selectedValue={newGenAvail.finishHour || 9}
                            onValueChange={(itemValue: number) => setNewGenAvail({ ...newGenAvail, finishHour: itemValue })}
                          >
                            {
                              [...Array(12).keys()].map((hour) => (
                                <Picker.Item
                                  key={`hour=${hour}`}
                                  label={`${hour + 1}`}
                                  value={hour + 1}
                                />
                              ))
                            }
                          </Picker>
                          <Picker
                            style={[styles.multiDropdownItem]}
                            selectedValue={newGenAvail.finishMinute || 0}
                            onValueChange={(itemValue: number) => setNewGenAvail({ ...newGenAvail, finishMinute: itemValue })}
                          >
                            {
                              [0, 15, 30, 45].map((minute) => (
                                <Picker.Item
                                  key={`minute-${minute}`}
                                  label={minute <= 8 ? `0${minute}` : `${minute}`}
                                  value={minute}
                                />
                              ))
                            }
                          </Picker>
                          <Picker
                            style={[styles.multiDropdownItem]}
                            selectedValue={newGenAvail.finishAMPM || 'AM'}
                            onValueChange={(itemValue: 'AM' | 'PM') => setNewGenAvail({ ...newGenAvail, finishAMPM: itemValue })}
                          >
                            {
                              ['AM', 'PM'].map((val) => (
                                <Picker.Item
                                  key={`ampm-${val}`}
                                  label={val}
                                  value={val}
                                />
                              ))
                            }
                          </Picker>
                        </View>
                      </View>
                    )
                  }
                  {
                    newGenAvail
                    && newDateStep === 3
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
                                  checked={newGenAvail.areas && newGenAvail.areas.length > 0 ? newGenAvail.areas.includes(area) : false}
                                  onIconPress={() => {
                                    if (newGenAvail.areas.includes(area)) {
                                      const newList = newGenAvail.areas.filter((item) => item !== area);
                                      setNewGenAvail({ ...newGenAvail, areas: newList });
                                    } else {
                                      setNewGenAvail({ ...newGenAvail, areas: [area, ...newGenAvail.areas]})
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
  multiDropdown: {
    flexDirection: 'row',
  },
  multiDropdownItem: {
    width: '33%'
  }
})

export default GeneralAvailability;