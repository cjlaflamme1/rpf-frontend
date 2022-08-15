import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { postPresignedUrl, putImageOnS3 } from '../../api/s3API';
import SignUpStepOne from '../../components/user/signUpStepOne';
import SignUpStepThree from '../../components/user/signUpStepThree';
import SignUpStepTwo from '../../components/user/signUpStepTwo';
import { SignupObject } from '../../models/SignupObject';
import { signUpAsync } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { getCurrentUserAsync } from '../../store/userSlice';

interface Props { };

const SignUp: React.FC<Props> = () => {
  const [signupPhase, setSignUpPhase] = useState(1);
  const [errors, setErrors] = useState(true);
  const [photo, setPhoto] = useState<File>();
  const [signupObject, setSignupObject] = useState<SignupObject>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!signupObject) {
      setSignupObject({
        email: '',
        password: '',
        matchingPw: false,
        firstName: '',
        lastName: '',
        profilePhoto: '',
        trOnly: false,
        lead: false,
        boulder: false,
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

  const signupClick = async () => {
    try {
      if (signupObject) {
        await dispatch(signUpAsync(signupObject));
        if (photo) {
          const preAuthPostUrl = await postPresignedUrl({ fileName: signupObject.profilePhoto, fileType: photo.type}).then((response) => response).catch((e) => {
            return e;
          });
          if (preAuthPostUrl.status === 201 && preAuthPostUrl.data) {
            await putImageOnS3(preAuthPostUrl.data, photo, photo.type).catch((e) => console.log(e));
          }
        }
        dispatch(getCurrentUserAsync());
      };
    } catch (e) {
      return e;
    }
  }

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
                photo={{ photo, setPhoto }}
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
          buttonStyle={[styles.logInButton]}
          onPress={() => setSignUpPhase(signupPhase - 1)}
        />
        {
          signupPhase <= 2
          ? (
            <Button
              title="Continue"
              disabled={validityCheck(signupPhase)}
              buttonStyle={[styles.logInButton]}
              onPress={() => setSignUpPhase(signupPhase + 1)}
            />
          )
          : (
            <Button
              title="Submit"
              disabled={validityCheck(signupPhase)}
              buttonStyle={[styles.logInButton]}
              onPress={signupClick}
            />
          )
        }
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
    marginBottom: 40,
  },
  logInButton: {
    width: 150,
    maxWidth: '95%',
    margin: 10,
  }
})

export default SignUp;