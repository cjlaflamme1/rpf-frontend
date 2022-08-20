import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signInAsync } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { getCurrentUserAsync } from '../../store/userSlice';

interface Props { };

const SignIn: React.FC<Props> = () => {
  const [signupPhase, setSignUpPhase] = useState(1);
  const [errors, setErrors] = useState(true);
  const scrollViewRef = useRef<KeyboardAwareScrollView|null>(null);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const dispatch = useAppDispatch();

  const signupClick = async () => {
    await dispatch(signInAsync({ email, password: pw }));
    dispatch(getCurrentUserAsync());
  }

  return (
    <View>
      <View style={[styles.headerText]}>
        <Text h1>Sign In</Text>
      </View>
      <KeyboardAwareScrollView
        scrollsToTop={false}
        ref={scrollViewRef}
        onLayout={() => scrollViewRef?.current?.scrollToEnd()}
        onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}
      >
        <View style={[styles.signUpContentContainer]}>
          <View style={[styles.inputContainer]}>
            <Input
              placeholder="Enter valid email"
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCompleteType={'email'}
              autoCorrect={false}
              inputContainerStyle={[styles.inputContainer]} />
            <Input
              placeholder="Enter password"
              label="Password"
              value={pw}
              onChangeText={setPw}
              autoCompleteType={'password'}
              autoCorrect={false}
              secureTextEntry={true}
              inputContainerStyle={[styles.inputContainer]} />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          title="Back"
          disabled={signupPhase <= 1}
          buttonStyle={[styles.logInButton]}
          onPress={() => setSignUpPhase(signupPhase - 1)}
        />
        <Button
          title="Submit"
          buttonStyle={[styles.logInButton]}
          onPress={signupClick}
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
    marginBottom: 40,
  },
  logInButton: {
    width: 150,
    maxWidth: '95%',
    margin: 10,
  },
  inputContainer: {
    width: '100%',
  }
})

export default SignIn;