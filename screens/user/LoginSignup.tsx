import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native-elements/dist/image/Image';

interface Props {
  navigation: any;
};

const LoginSignup: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={[styles.topContainer]}>
      <View style={[styles.centerContainer]}>
        <Text h1>Rumney</Text>
        <Text h1>Partner Finder</Text>
      </View>
      <View style={[styles.centerContainer]}>
        <Image
        source={{uri: "https://via.placeholder.com/150"}}
        style={{width: 150, height: 150}}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <Button
        title="Login"
        buttonStyle={[styles.logInButton]}
        onPress={() => navigation.navigate('User Landing')}
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
    })
  }
})

export default LoginSignup;