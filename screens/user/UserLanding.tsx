import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

interface Props {};

const UserLanding: React.FC<Props> = () => {
  return (
    <View>
      <Text h1>Heyo this is user landing</Text>
    </View>
  )
};

export default UserLanding;