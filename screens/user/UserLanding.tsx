import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Badge, Button, Switch, Text } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { useAppSelector } from '../../store/hooks';

interface Props {
  navigation: any
};

const UserLanding: React.FC<Props> = ({ navigation }) => {
  const [checked, setChecked] = useState(true);
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
        <View style={[styles.profileWidgetContainer]}>
          <View style={[styles.profileWidgetRow]}>
            <Switch
              value={checked}
              onValueChange={(value) => setChecked(value)}
              style= {[styles.profileWidgetItem]}
            />
            <Text style= {[styles.profileWidgetItem]}>Partner Finder Visibility</Text>
          </View>
          <View style={[styles.profileWidgetRow]}>
            <Text style= {[styles.profileWidgetItem]}>Partners Found</Text>
            <Badge
              containerStyle={[styles.profileWidgetItem]}
              value="4"
              status="primary"
            />
          </View>
          <View style={[styles.profileWidgetRow]}>
            <Badge
              containerStyle={[styles.profileWidgetItem]}
              value="8"
              status="primary"
            />
            <Text style= {[styles.profileWidgetItem]}>Requests Open</Text>
          </View>
          <View style={[styles.profileWidgetRow]}>
            <Text style= {[styles.profileWidgetItem]}>Upcoming meetups</Text>
            <Badge
              containerStyle={[styles.profileWidgetItem]}
              value="2"
              status="primary"
            />
          </View>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            containerStyle={[styles.navButton]}
            title={'Personal Profile'}
            onPress={() => navigation.navigate('Personal Profile')}
          />
          <Button
            containerStyle={[styles.navButton]}
            title={'Climbing Profile'}
            onPress={() => navigation.navigate('Climbing Profile')}
          />
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
  },
  profileWidgetContainer: {
    maxWidth: '100%',
  },
  profileWidgetRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileWidgetItem: {
    marginLeft: 5,
    marginRight: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    marginTop: 40,
    minWidth: '50%',
  }
})

export default UserLanding;