import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput } from 'react-native';
import { ButtonGroup, Switch, Text } from 'react-native-elements';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import userSlice, { updateCurrentUserAsync, User } from '../../store/userSlice';
import { Ionicons } from '@expo/vector-icons';
import { updateCurrentUser } from '../../api/userAPI';
import { Picker } from '@react-native-picker/picker';
import { vScale, yds } from '../../assets/climbingVars/climbingGrades';

interface Props {
  otherUser?: User | null;
};

const ClimbingProfile: React.FC<Props> = ({ otherUser }) => {
  const [climberBioText, setClimberBioText] = useState('');
  const [selectedBox, setSelectedBox] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentState = useAppSelector((state) => ({
    userState: state.userState,
  }));
  const dispatch = useAppDispatch();
  const { currentUser } = currentState.userState;
  if (!currentUser) {
    return (<View />);
  }

  const selectorValue = (attemptStyle: string) => {
    if (attemptStyle === 'warmup') {
      switch (selectedBox) {
        case 'tr':
          return currentUser.climbingProfile.trWarmup;
        case 'lead':
          return currentUser.climbingProfile.leadWarmup;
        case 'boulder':
          return currentUser.climbingProfile.boulderWarmup;
      }
    } else if (attemptStyle === 'onsight') {
      switch (selectedBox) {
        case 'tr':
          return currentUser.climbingProfile.trOnsight;
        case 'lead':
          return currentUser.climbingProfile.leadOnsight;
        case 'boulder':
          return currentUser.climbingProfile.boulderOnsight;
      }
    } else if (attemptStyle === 'redpoint') {
      switch (selectedBox) {
        case 'tr':
          return currentUser.climbingProfile.trRedpoint;
        case 'lead':
          return currentUser.climbingProfile.leadRedpoint;
        case 'boulder':
          return currentUser.climbingProfile.boulderRedpoint;
      }
    }
  }

  const otherUserSelectorValue = (attemptStyle: string) => {
    if(otherUser) {
      if (attemptStyle === 'warmup') {
        switch (selectedBox) {
          case 'tr':
            return otherUser.climbingProfile.trWarmup;
          case 'lead':
            return otherUser.climbingProfile.leadWarmup;
          case 'boulder':
            return otherUser.climbingProfile.boulderWarmup;
        }
      } else if (attemptStyle === 'onsight') {
        switch (selectedBox) {
          case 'tr':
            return otherUser.climbingProfile.trOnsight;
          case 'lead':
            return otherUser.climbingProfile.leadOnsight;
          case 'boulder':
            return otherUser.climbingProfile.boulderOnsight;
        }
      } else if (attemptStyle === 'redpoint') {
        switch (selectedBox) {
          case 'tr':
            return otherUser.climbingProfile.trRedpoint;
          case 'lead':
            return otherUser.climbingProfile.leadRedpoint;
          case 'boulder':
            return otherUser.climbingProfile.boulderRedpoint;
        }
      }
    }
    return '';
  }

  const setWarmup = (input: string) => {
    switch (selectedBox) {
      case 'tr':
        if (currentUser.climbingProfile.trWarmup !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                trWarmup: input,
              }
            }
          }));
        }
        break;
      case 'lead':
        if (currentUser.climbingProfile.leadWarmup !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                leadWarmup: input,
              }
            }
          }));
        }
        break;
      case 'boulder':
        if (currentUser.climbingProfile.boulderWarmup !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                boulderWarmup: input,
              }
            }
          }));
        }
        break;
    }
  };

  const setOnsight = (input: string) => {
    switch (selectedBox) {
      case 'tr':
        if (currentUser.climbingProfile.trOnsight !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                trOnsight: input,
              }
            }
          }));
        }
        break;
      case 'lead':
        if (currentUser.climbingProfile.leadOnsight !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                leadOnsight: input,
              }
            }
          }));
        }
        break;
      case 'boulder':
        if (currentUser.climbingProfile.boulderOnsight !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                boulderOnsight: input,
              }
            }
          }));
        }
        break;
    }
  }

  const setRedpoint = (input: string) => {
    switch (selectedBox) {
      case 'tr':
        if (currentUser.climbingProfile.trRedpoint !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                trRedpoint: input,
              }
            }
          }));
        }
        break;
      case 'lead':
        if (currentUser.climbingProfile.leadRedpoint !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                leadRedpoint: input,
              }
            }
          }));
        }
        break;
      case 'boulder':
        if (currentUser.climbingProfile.boulderRedpoint !== input) {
          dispatch(updateCurrentUserAsync({
            id: currentUser.id,
            updateBody: {
              climbingProfile: {
                id: currentUser.climbingProfile.id,
                boulderRedpoint: input,
              }
            }
          }));
        }
        break;
    }
  }

  if (otherUser) {
    return (
      <View>
      <ScrollView>
        <View style={[styles.imageContainer, { borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 5, minWidth: '90%' }]}>
          <Text style={[styles.profileName]}> {`${otherUser.firstName} ${otherUser.lastName}`} </Text>
        </View>
        {
          otherUser.climbingProfile
          && (
            <View>
              <View style={[styles.sectionContainer]}>
                {
                  otherUser.climbingProfile.trOnly
                  && (
                    <View style={[{ flexDirection: 'row' }]}>
                      <View style={[styles.checkboxBase, styles.checkboxChecked]}>
                        <Ionicons name="checkmark" size={24} color="white" />
                      </View>
                      <Text h4>Top Rope Only</Text>
                    </View>
                  )
                }
                {
                  otherUser.climbingProfile.leadCapable
                  && (
                    <View style={[{ flexDirection: 'row' }]}>
                      <View style={[styles.checkboxBase, styles.checkboxChecked]}>
                        <Ionicons name="checkmark" size={24} color="white" />
                      </View>
                      <Text h4>Lead Climber</Text>
                    </View>
                  )
                }
                {
                  otherUser.climbingProfile.boulderer
                  && (
                    <View style={[{ flexDirection: 'row' }]}>
                      <View style={[styles.checkboxBase, styles.checkboxChecked]}>
                        <Ionicons name="checkmark" size={24} color="white" />
                      </View>
                      <Text h4>Bouldering</Text>
                    </View>
                  )
                }
              </View>
              <View style={[styles.sectionContainer]}>
                <Text style={[styles.h4Heading]} h4>Climbing Bio</Text>
                <Text>{otherUser.climbingProfile.climberBio || 'No bio provided. Womp womp.'}</Text>
              </View>
              <View style={[styles.inputContainer]}>
                <View>
                  <ButtonGroup
                    buttons={['TR', 'Lead', 'Boulder']}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                      switch (value) {
                        case 0:
                          setSelectedBox('tr')
                          break;
                        case 1:
                          setSelectedBox('lead')
                          break;
                        case 2:
                          setSelectedBox('boulder')
                          break;
                      }
                      setSelectedIndex(value);
                    }}
                    containerStyle={{ marginBottom: 20 }}
                  />
                </View>
                <View style={[styles.dropdownContainer]}>
                  <Text style={[styles.dropdownLabel]}>Warm up pref</Text>
                  <Text style={[styles.dropdownLabel]}>Onsight</Text>
                  <Text style={[styles.dropdownLabel]}>Redpoint</Text>
                </View>
                <View style={styles.dropdownContainer}>
                  <Text style={[styles.dropdownItem, { textAlign: 'center' }]}>{otherUserSelectorValue('warmup')}</Text>
                  <Text style={[styles.dropdownItem, { textAlign: 'center' }]}>{otherUserSelectorValue('onsight')}</Text>
                  <Text style={[styles.dropdownItem, { textAlign: 'center' }]}>{otherUserSelectorValue('redpoint')}</Text>
                </View>
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
    )
  }

  return (
    <View>
      <ScrollView>
        <View style={[styles.imageContainer, { borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 5, minWidth: '90%' }]}>
          <Text style={[styles.profileName]}> {`${currentUser.firstName} ${currentUser.lastName}`} </Text>
        </View>
        {
          currentUser.climbingProfile
          && (
            <View style={[styles.sectionContainer]}>
              <View style={[styles.switchBox]}>
                <Switch
                  value={currentUser.climbingProfile.trOnly}
                  style={[{ margin: 10 }]}
                  onValueChange={(value) => {
                    if (currentUser.climbingProfile.trOnly !== value) {
                      dispatch(updateCurrentUserAsync({
                        id: currentUser.id,
                        updateBody: {
                          climbingProfile: {
                            ...currentUser.climbingProfile,
                            trOnly: value,
                          }
                        }
                      }))
                    }
                  }}
                />
                <Text h4>Top Rope Only</Text>
              </View>
              <View style={[styles.switchBox]}>
                <Switch
                  value={currentUser.climbingProfile.leadCapable}
                  style={[{ margin: 10 }]}
                  onValueChange={(value) => {
                    if (currentUser.climbingProfile.leadCapable !== value) {
                      dispatch(updateCurrentUserAsync({
                        id: currentUser.id,
                        updateBody: {
                          climbingProfile: {
                            ...currentUser.climbingProfile,
                            leadCapable: value,
                          }
                        }
                      }))
                    }
                  }}
                />
                <Text h4>Lead Climber</Text>
              </View>
              <View style={[styles.switchBox]}>
                <Switch
                  value={currentUser.climbingProfile.boulderer}
                  style={[{ margin: 10 }]}
                  onValueChange={(value) => {
                    if (currentUser.climbingProfile.boulderer !== value) {
                      dispatch(updateCurrentUserAsync({
                        id: currentUser.id,
                        updateBody: {
                          climbingProfile: {
                            id: currentUser.climbingProfile.id,
                            boulderer: value,
                          }
                        }
                      }))
                    }
                  }}
                />
                <Text h4>Bouldering</Text>
              </View>
            </View>
          )
        }
        {
          currentUser.climbingProfile
          && (
            <View style={[styles.sectionContainer]}>
              <Text style={[styles.h4Heading]} h4>Climbing Bio</Text>
              <TextInput
                style={[styles.inputBox]}
                placeholder='Tell everyone more about your climbing experience.  Can you clean anchors? Rappel? etc.'
                multiline
                spellCheck
                defaultValue={currentUser.climbingProfile.climberBio || ''}
                numberOfLines={6}
                onChangeText={(e) => setClimberBioText(e)}
                onEndEditing={() => {
                  dispatch(updateCurrentUserAsync({
                    id: currentUser.id,
                    updateBody: {
                      climbingProfile: {
                        id: currentUser.climbingProfile.id,
                        climberBio: climberBioText || ''
                      }
                    }
                  }))
                }}
              />
          </View>
          )
        }
        {
          currentUser.climbingProfile
          && (
            <View style={[styles.inputContainer]}>
              <View>
                <ButtonGroup
                  buttons={['TR', 'Lead', 'Boulder']}
                  selectedIndex={selectedIndex}
                  onPress={(value) => {
                    switch (value) {
                      case 0:
                        setSelectedBox('tr')
                        break;
                      case 1:
                        setSelectedBox('lead')
                        break;
                      case 2:
                        setSelectedBox('boulder')
                        break;
                    }
                    setSelectedIndex(value);
                  }}
                  containerStyle={{ marginBottom: 20 }}
                />
              </View>
              <View style={[styles.dropdownContainer]}>
                <Text style={[styles.dropdownLabel]}>Warm up pref</Text>
                <Text style={[styles.dropdownLabel]}>Onsight</Text>
                <Text style={[styles.dropdownLabel]}>Redpoint</Text>
              </View>
              <View style={styles.dropdownContainer}>
                <Picker
                  style={styles.dropdownItem}
                  selectedValue={selectorValue('warmup')}
                  onValueChange={(itemValue: string) => setWarmup(itemValue)}
                >
                  {
                    selectedBox !== 'boulder'
                    && yds.map((grade) => (
                      <Picker.Item key={`${grade}-lead-warmup-user`} label={grade} value={grade} />
                    ))
                  }
                  {
                    selectedBox === 'boulder'
                    && vScale.map((grade) => (
                      <Picker.Item key={`${grade}-boulder-warmup-user`} label={grade} value={grade} />
                    ))
                  }
                </Picker>
                <Picker
                  style={styles.dropdownItem}
                  selectedValue={selectorValue('onsight')}
                  onValueChange={(itemValue: string) => setOnsight(itemValue)}
                >
                  {
                    selectedBox !== 'boulder'
                    && yds.map((grade) => (
                      <Picker.Item key={`${grade}-lead-onsite-user`} label={grade} value={grade} />
                    ))
                  }
                  {
                    selectedBox === 'boulder'
                    && vScale.map((grade) => (
                      <Picker.Item key={`${grade}-boulder-onsite-user`} label={grade} value={grade} />
                    ))
                  }
                </Picker>
                <Picker
                  style={styles.dropdownItem}
                  selectedValue={selectorValue('redpoint')}
                  onValueChange={(itemValue: string) => setRedpoint(itemValue)}
                >
                  {
                    selectedBox !== 'boulder'
                    && yds.map((grade, index) => (
                      <Picker.Item key={`${selectedBox}-${grade}-${index}`} label={grade} value={grade} />
                    ))
                  }
                  {
                    selectedBox === 'boulder'
                    && vScale.map((grade, index) => (
                      <Picker.Item key={`${selectedBox}-${grade}-${index}`} label={grade} value={grade} />
                    ))
                  }
                </Picker>
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputContainer: {
    width: '100%',
  },
  imageBase: {
    aspectRatio: 1,
    width: "100%",
    maxWidth: 150,
    maxHeight: 150,
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
  },
  inputBox: {
    backgroundColor: 'white',
    minWidth: '90%',
    maxWidth: '90%',
    padding: 10,
  },
  h4Heading: {
    textAlign: 'center',
    margin: 10, 
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
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
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dropdownItem: {
    width: '33%'
  },
  dropdownLabel: {
    width: '33%',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default ClimbingProfile;

ClimbingProfile.defaultProps = {
  otherUser: null,
};
function selectorValue(arg0: string): string | undefined {
  throw new Error('Function not implemented.');
}

