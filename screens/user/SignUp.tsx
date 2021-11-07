import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import SignUpStepOne from '../../components/user/signUpStepOne';
import SignUpStepThree from '../../components/user/signUpStepThree';
import SignUpStepTwo from '../../components/user/signUpStepTwo';

interface Props { };

const SignUp: React.FC<Props> = () => {
  const [signupPhase, setSignUpPhase] = useState(1);

  return (
    <View>
      <View style={[styles.headerText]}>
        <Text h1>Sign Up</Text>
      </View>
      <View style={[styles.signUpContentContainer]}>
        {
          signupPhase === 1 && <SignUpStepOne />
        }
        {
          signupPhase === 2 && <SignUpStepTwo />
        }
        {
          signupPhase === 3 && <SignUpStepThree />
        }
      </View>
      <View style={[styles.buttonContainer]}>
        <Button
        title="Back"
        disabled={signupPhase <= 1}
        onPress={() => setSignUpPhase(signupPhase - 1)}
        style={[styles.logInButton]}
        />
        <Button
        title="Continue"
        onPress={() => setSignUpPhase(signupPhase + 1)}
        style={[styles.logInButton]}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpContentContainer: {
    width: '95%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInButton: {
    width: 150,
    maxWidth: '95%',
    margin: 10,
  }
})

export default SignUp;