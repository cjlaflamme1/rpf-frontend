import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

interface Props {};

const SignUpStepOne: React.FC<Props> = () => {
  return (
    <View style={[styles.inputContainer]}>
     <Input
          placeholder="Enter valid email"
          label="Email"
          autoCompleteType={'email'}
          autoCorrect={false}
          inputContainerStyle={[styles.inputContainer]} />
        <Input
          placeholder="Enter password"
          label="Password"
          autoCompleteType={'password'}
          autoCorrect={false}
          secureTextEntry={true}
          inputContainerStyle={[styles.inputContainer]} />
        <Input placeholder="Re-enter password"
          label="Re-enter Password"
          autoCompleteType={'password'}
          autoCorrect={false}
          secureTextEntry={true}
          inputContainerStyle={[styles.inputContainer]} />
    </View>
  )
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  }
})

export default SignUpStepOne;