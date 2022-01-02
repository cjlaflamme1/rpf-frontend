import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, CheckBox, ButtonGroup, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { SignupObject } from '../../models/SignupObject';

interface Props {
  signupModel: {
    signupObject: SignupObject;
    setSignupObject: Function;
  }
};

const SignUpStepThree: React.FC<Props> = ({ signupModel }) => {
  const { signupObject, setSignupObject } = signupModel;
  const [selectedBox, setSelectedBox] = useState('tr');
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      <Text style={[styles.headingText]} h4>Climbing Styles</Text>
      <Input
        placeholder="Enter climbing styles"
        inputContainerStyle={[styles.inputContainer]} />
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
          <Picker.Item label="< 5.4" value="5.4" />
          <Picker.Item label="5.5" value="5.5" />
          <Picker.Item label="5.6" value="5.6" />
          <Picker.Item label="5.7" value="5.7" />
          <Picker.Item label="5.8" value="5.8" />
          <Picker.Item label="5.9" value="5.9" />
        </Picker>
        <Picker
          style={styles.dropdownItem}
          selectedValue={selectorValue('onsight')}
          onValueChange={(itemValue: string) => setOnsight(itemValue)}
        >
          <Picker.Item label="< 5.4" value="5.4" />
          <Picker.Item label="5.5" value="5.5" />
          <Picker.Item label="5.6" value="5.6" />
          <Picker.Item label="5.7" value="5.7" />
          <Picker.Item label="5.8" value="5.8" />
          <Picker.Item label="5.9" value="5.9" />
        </Picker>
        <Picker
          style={styles.dropdownItem}
          selectedValue={selectorValue('redpoint')}
          onValueChange={(itemValue: string) => setRedpoint(itemValue)}
        >
          <Picker.Item label="< 5.4" value="5.4" />
          <Picker.Item label="5.5" value="5.5" />
          <Picker.Item label="5.6" value="5.6" />
          <Picker.Item label="5.7" value="5.7" />
          <Picker.Item label="5.8" value="5.8" />
          <Picker.Item label="5.9" value="5.9" />
        </Picker>
      </View>


      <Text style={[styles.headingText]} h4>Preferred Crags</Text>
      <Input
        placeholder="Enter favorite crags"
        inputContainerStyle={[styles.inputContainer]} />
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