import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text } from 'react-native-elements';

interface Props { };

const SignUpStepThree: React.FC<Props> = () => {
  return (
    <View style={[styles.inputContainer]}>
      <Text style={[styles.headingText]} h4>Climbing Styles</Text>
      <Input
        placeholder="Enter climbing styles"
        inputContainerStyle={[styles.inputContainer]} />
      <Text style={[styles.headingText]} h4>Grades</Text>

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
  }
})

export default SignUpStepThree;