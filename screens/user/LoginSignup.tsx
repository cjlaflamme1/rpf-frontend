import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

interface Props {
  navigation: any;
};

const LoginSignup: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text h1>Hello signup world!</Text>
      <Button
      title="Go to User Landing"
      onPress={() => navigation.navigate('User Landing')} />
    </View>
  )
};

export default LoginSignup;