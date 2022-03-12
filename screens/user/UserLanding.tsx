import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { useAppSelector } from '../../store/hooks';

interface Props {};

const UserLanding: React.FC<Props> = () => {
  const currentState = useAppSelector((state) => ({
    userState: state.userState,
  }));

  if (!currentState.userState.currentUser) {
    return <View />
  }
  const { firstName, lastName } = currentState.userState.currentUser;
  return (
    <View>
      <ScrollView>
        <View style={[styles.imageContainer]}>
          <Image
            containerStyle={[styles.imageBase]}
            source={{uri: 'https://via.placeholder.com/150'}}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={[styles.profileName]}> {`${firstName} ${lastName}`} </Text>
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageBase: {
    aspectRatio: 1,
    width: '100%',
    maxWidth: 150,
    maxHeight: 150,
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
  }
})

export default UserLanding;