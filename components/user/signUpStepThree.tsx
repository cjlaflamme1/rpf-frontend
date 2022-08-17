import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Text, CheckBox, ButtonGroup } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { SignupObject } from '../../models/SignupObject';
import { vScale, yds } from '../../assets/climbingVars/climbingGrades';

interface Props {
  signupModel: {
    signupObject: SignupObject;
    setSignupObject: Function;
  }
};

const SignUpStepThree: React.FC<Props> = ({ signupModel }) => {
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({ window, screen });
  const { signupObject, setSignupObject } = signupModel;
  const [selectedBox, setSelectedBox] = useState('tr');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  }, [])

  const selectorValue = (attemptStyle: string) => {
    if (attemptStyle === 'warmup') {
      switch (selectedBox) {
        case 'tr':
          return signupObject.trWarmUp;
        case 'lead':
          return signupObject.leadWarmUp;
        case 'boulder':
          return signupObject.boulderWarmUp;
      }
    } else if (attemptStyle === 'onsight') {
      switch (selectedBox) {
        case 'tr':
          return signupObject.trOnsight;
        case 'lead':
          return signupObject.leadOnsight;
        case 'boulder':
          return signupObject.boulderOnsight;
      }
    } else if (attemptStyle === 'redpoint') {
      switch (selectedBox) {
        case 'tr':
          return signupObject.trRedpoint;
        case 'lead':
          return signupObject.leadRedpoint;
        case 'boulder':
          return signupObject.boulderRedpoint;
      }
    }
  }

  const setWarmup = (input: string) => {
    switch (selectedBox) {
      case 'tr':
        setSignupObject({ ...signupObject, trWarmUp: input });
        break;
      case 'lead':
        setSignupObject({ ...signupObject, leadWarmUp: input });
        break;
      case 'boulder':
        setSignupObject({ ...signupObject, boulderWarmUp: input });
        break;
    }
  }

  const setOnsight = (input: string) => {
    switch (selectedBox) {
      case 'tr':
        setSignupObject({ ...signupObject, trOnsight: input });
        break;
      case 'lead':
        setSignupObject({ ...signupObject, leadOnsight: input });
        break;
      case 'boulder':
        setSignupObject({ ...signupObject, boulderOnsight: input });
        break;
    }
  }

  const setRedpoint = (input: string) => {
    switch (selectedBox) {
      case 'tr':
        setSignupObject({ ...signupObject, trRedpoint: input });
        break;
      case 'lead':
        setSignupObject({ ...signupObject, leadRedpoint: input });
        break;
      case 'boulder':
        setSignupObject({ ...signupObject, boulderRedpoint: input });
        break;
    }
  }

  return (
    <View style={[styles.inputContainer]}>
      <Text style={[styles.headingText]} h4>Preferred Climbing Styles</Text>
      <CheckBox
        center
        title="Top-rope only"
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={signupObject.trOnly}
        onPress={() => setSignupObject({ ...signupObject, trOnly: !signupObject.trOnly })}
      />
      <CheckBox
        center
        title="Lead climbing"
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={signupObject.lead}
        onPress={() => setSignupObject({ ...signupObject, lead: !signupObject.lead })}
      />
      <CheckBox
        center
        title="Bouldering"
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={signupObject.boulder}
        onPress={() => setSignupObject({ ...signupObject, boulder: !signupObject.boulder })}
      />
      <Text style={[styles.headingText]} h4>Grades</Text>
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
      {
        Platform.OS === 'android'
          ? (
            <>
              {
                dimensions.screen.width >= 425
                  ? (
                      <>
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
                                <Picker.Item label={grade} value={grade} />
                              ))
                            }
                            {
                              selectedBox === 'boulder'
                              && vScale.map((grade) => (
                                <Picker.Item label={grade} value={grade} />
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
                                <Picker.Item label={grade} value={grade} />
                              ))
                            }
                            {
                              selectedBox === 'boulder'
                              && vScale.map((grade) => (
                                <Picker.Item label={grade} value={grade} />
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
                      </>
                  ) : (
                    <View style={[{width: '100%', justifyContent: 'center', flexDirection: 'column'}]}>
                        <View style={[styles.dropdownContainer, styles.singleDropdownContainer]}>
                          <Text style={[styles.singleDropdownLabel]}>Warm up pref</Text>
                          <Picker
                            // style={styles.dropdownItem}
                            style={[styles.singleDropdownItem]}
                            selectedValue={selectorValue('warmup')}
                            onValueChange={(itemValue: string) => setWarmup(itemValue)}
                          >
                            {
                              selectedBox !== 'boulder'
                              && yds.map((grade) => (
                                <Picker.Item label={grade} value={grade} />
                              ))
                            }
                            {
                              selectedBox === 'boulder'
                              && vScale.map((grade) => (
                                <Picker.Item label={grade} value={grade} />
                              ))
                            }
                          </Picker>
                        </View>
                        <View style={[styles.dropdownContainer, styles.singleDropdownContainer]}>
                          <Text style={[styles.singleDropdownLabel]}>Onsight</Text>
                          <Picker
                            style={styles.singleDropdownItem}
                            selectedValue={selectorValue('onsight')}
                            onValueChange={(itemValue: string) => setOnsight(itemValue)}
                          >
                            {
                              selectedBox !== 'boulder'
                              && yds.map((grade) => (
                                <Picker.Item label={grade} value={grade} />
                              ))
                            }
                            {
                              selectedBox === 'boulder'
                              && vScale.map((grade) => (
                                <Picker.Item label={grade} value={grade} />
                              ))
                            }
                          </Picker>
                        </View>
                        <View style={[styles.dropdownContainer, styles.singleDropdownContainer]}>
                          <Text style={[styles.singleDropdownLabel]}>Redpoint</Text>
                          <Picker
                            style={styles.singleDropdownItem}
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
            </>
            
          ) : (
            <>
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
                      <Picker.Item label={grade} value={grade} />
                    ))
                  }
                  {
                    selectedBox === 'boulder'
                    && vScale.map((grade) => (
                      <Picker.Item label={grade} value={grade} />
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
                      <Picker.Item label={grade} value={grade} />
                    ))
                  }
                  {
                    selectedBox === 'boulder'
                    && vScale.map((grade) => (
                      <Picker.Item label={grade} value={grade} />
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
            </>
          )
      }
    </View>
  )
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  headingText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dropdownItem: {
    width: '33%'
  },
  singleDropdownItem : {
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center'
  },
  singleDropdownLabel: {
    textAlign: 'center',
  },
  singleDropdownContainer: {
    flexDirection: 'column',
  },
  dropdownLabel: {
    width: '33%',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  typeSelections: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SignUpStepThree;