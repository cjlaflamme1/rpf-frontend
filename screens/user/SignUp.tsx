import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import SignUpStepOne from '../../components/user/signUpStepOne';
import SignUpStepThree from '../../components/user/signUpStepThree';
import SignUpStepTwo from '../../components/user/signUpStepTwo';
import { SignupObject } from '../../models/SignupObject';

interface Props { };

const SignUp: React.FC<Props> = () => {
  const [signupPhase, setSignUpPhase] = useState(1);
  const [errors, setErrors] = useState(true);
  const [signupObject, setSignupObject] = useState<SignupObject>();

  useEffect(() => {
    if (!signupObject) {
      setSignupObject({
        email: '',
        password: '',
        matchingPw: false,
        firstName: '',
        lastName: '',
        profilePhoto: '',
        climbingStyles: '',
        trWarmUp: '',
        trOnsight: '',
        trRedpoint: '',
        leadWarmUp: '',
        leadOnsight: '',
        leadRedpoint: '',
        boulderWarmUp: '',
        boulderOnsight: '',
        boulderRedpoint: '',
        preferredCrags: '',
      });
    }
  }, []);

  useEffect(() => {
    console.log(signupObject);
  }, [signupObject]);

  const validityCheck = (phase: number) => {
    if (signupObject) {
      if (phase === 1) {
        if (signupObject.email && signupObject.password && signupObject.matchingPw) {
          return false;
        }
        return true;
      } else if (phase === 2) {
        if (signupObject.firstName && signupObject.lastName) {
          return false
        }
        return true;
      } else if (phase === 3) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  };

  return (
    <View>
      <View style={[styles.headerText]}>
        <Text h1>Sign Up</Text>
      </View>
      <ScrollView>
        <View style={[styles.signUpContentContainer]}>
          {
            signupPhase === 1
            && signupObject
            && (
              <SignUpStepOne
                signupModel={{ signupObject, setSignupObject }}
              />
            )
          }
          {
            signupPhase === 2
            && signupObject
            && (
              <SignUpStepTwo
                signupModel={{ signupObject, setSignupObject }}
              />
            )
          }
          {
            signupPhase === 3
            && signupObject
            && (
              <SignUpStepThree
              signupModel={{ signupObject, setSignupObject }}
              />
            )
          }
        </View>
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          title="Back"
          disabled={signupPhase <= 1}
          onPress={() => setSignUpPhase(signupPhase - 1)}
          style={[styles.logInButton]}
        />
        <Button
          title="Continue"
          disabled={validityCheck(signupPhase)}
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