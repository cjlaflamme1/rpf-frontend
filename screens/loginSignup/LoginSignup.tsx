import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';
import { clearGenAvailState } from '../../store/climbAvailabilityGenSlice';
import { clearScheduleAvailState } from '../../store/climbAvailabilityScheduledSlice';
import { useAppDispatch } from '../../store/hooks';
import { clearUserState } from '../../store/userSlice';

interface Props {
  navigation: any;
};

const LoginSignup: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearUserState());
    dispatch(clearGenAvailState());
    dispatch(clearScheduleAvailState());
  }, [])
  const imageUri = "../../assets/rpf_icon.png";
  return (
    <View style={[styles.topContainer]}>
      <View style={[styles.centerContainer]}>
        <Text h1>NH Climbing</Text>
        <Text h1>Partners</Text>
      </View>
      <View style={[styles.centerContainer]}>
        <Image
          source={require(imageUri)}
          style={{width: 150, height: 150, maxHeight: 150, maxWidth: 150}}
          resizeMode={'center'}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <Button
          title="Login"
          buttonStyle={[styles.logInButton]}
          onPress={() => navigation.navigate('SignIn')}
        />
        <Button
          title="Sign Up"
          buttonStyle={[styles.logInButton]}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAEAEF',
  },
  centerContainer: {
    alignItems: 'center',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInButton: {
    width: 100,
    margin: 10,
    ...Platform.select({
      android: {
        marginHorizontal: 20,
      }
    }),
    backgroundColor: '#CC1406',
  }
})

export default LoginSignup;