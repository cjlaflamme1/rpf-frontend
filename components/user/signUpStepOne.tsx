import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { SignupObject } from '../../models/SignupObject';

interface Props {
  signupModel: {
    signupObject: SignupObject;
    setSignupObject: Function;
  }
};

const SignUpStepOne: React.FC<Props> = ({ signupModel }) => {
  const { signupObject, setSignupObject } = signupModel;
  const [pwError, setPwError] = useState('');
  const [matchingPW, setMatchingPW] = useState('');

  const checkValidity = (pw: string) => {
    if (pw.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm)) {
      setSignupObject({ ...signupObject, password: pw });
      setPwError('');
    } else (
      setPwError('Min 8 characters, at least 1 lower case, upper case, number, and special character')
    );
  }

  const checkMatch = () => {
    if (matchingPW !== signupObject.password) {
      // setSignupObject({ ...signupObject, matchingPW: false });
      return 'Passwords do not match'
    } else {
      // setSignupObject({ ...signupObject, matchingPW: true });
      return '';
    }
  }

  useEffect(() => {
    if (matchingPW !== signupObject.password) {
      setSignupObject({ ...signupObject, matchingPw: false });
    } else {
      setSignupObject({ ...signupObject, matchingPw: true });
    }
  }, [matchingPW])

  return (
    <View style={[styles.inputContainer]}>
      <Input
        placeholder="Enter valid email"
        label="Email"
        value={signupObject.email || ''}
        onChange={(e) => setSignupObject({ ...signupObject, email: e.target.valueOf() })}
        onChangeText={(text) => setSignupObject({ ...signupObject, email: text })}
        autoCompleteType={'email'}
        autoCorrect={false}
        inputContainerStyle={[styles.inputContainer]} />
      <Input
        placeholder="Enter password"
        label="Password"
        onChangeText={(text) => checkValidity(text)}
        errorMessage={pwError}
        autoCompleteType={'password'}
        autoCorrect={false}
        secureTextEntry={true}
        inputContainerStyle={[styles.inputContainer]} />
      <Input placeholder="Re-enter password"
        label="Re-enter Password"
        autoCompleteType={'password'}
        errorMessage={checkMatch()}
        value={matchingPW}
        onChangeText={(text) => setMatchingPW(text)}
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