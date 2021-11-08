import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

interface Props { };

const SignUpStepThree: React.FC<Props> = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={[styles.inputContainer]}>
      <Text style={[styles.headingText]} h4>Climbing Styles</Text>
      <Input
        placeholder="Enter climbing styles"
        inputContainerStyle={[styles.inputContainer]} />
      <Text style={[styles.headingText]} h4>Grades</Text>
      <View style={[styles.dropdownContainer, styles.typeSelections]}>
        <CheckBox
          checked={false}
          style={[styles.dropdownLabel]}
          title={'TR'}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
        <CheckBox
          checked={false}
          style={[styles.dropdownLabel]}
          title={'Lead'}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
        <CheckBox
          checked={false}
          style={[styles.dropdownLabel]}
          title={'Boulder'}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
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
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="< 5.4" value="5.4" />
          <Picker.Item label="5.5" value="5.5" />
          <Picker.Item label="5.6" value="5.6" />
          <Picker.Item label="5.7" value="5.7" />
          <Picker.Item label="5.8" value="5.8" />
          <Picker.Item label="5.9" value="5.9" />
        </Picker>
        <Picker
          style={styles.dropdownItem}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="< 5.4" value="5.4" />
          <Picker.Item label="5.5" value="5.5" />
          <Picker.Item label="5.6" value="5.6" />
          <Picker.Item label="5.7" value="5.7" />
          <Picker.Item label="5.8" value="5.8" />
          <Picker.Item label="5.9" value="5.9" />
        </Picker>
        <Picker
          style={styles.dropdownItem}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
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
    textAlign: 'center',
  },
  typeSelections: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SignUpStepThree;