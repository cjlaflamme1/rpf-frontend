import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Badge, Button, Switch, Text } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { getAllclimbAvailabilityScheduledAsync } from '../../store/climbAvailabilityScheduledSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateCurrentUserAsync } from '../../store/userSlice';

interface Props {
  navigation: any
};

const UserLanding: React.FC<Props> = ({ navigation }) => {
  const [checked, setChecked] = useState(true);
  const currentState = useAppSelector((state) => ({
    userState: state.userState,
    climbAvailabilityScheduledState: state.climbAvailabilityScheduledState,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentState.userState.currentUser) {
      dispatch(getAllclimbAvailabilityScheduledAsync());
    }
  }, []);

  if (!currentState.userState.currentUser) {
    return <View />
  }

  const changeFinderVisibility = (checked: boolean) => {
    dispatch(updateCurrentUserAsync({
      id: currentUser.id,
      updateBody: {
        finderVisibility: checked,
      },
    }))
  }


  const { currentUser } = currentState.userState;
  const { firstName, lastName } = currentState.userState.currentUser;
  const { allScheduledAvailability } = currentState.climbAvailabilityScheduledState;
  return (
    <View>
      <ScrollView>
        <View style={[styles.imageContainer]}>
          {
            currentUser.imageGetURL
            && currentUser.imageGetURL.length > 0
              ? (
                <Image
                  containerStyle={[styles.imageBase]}
                  style={[styles.image]}
                  source={{ uri: currentUser.imageGetURL }}
                  PlaceholderContent={<ActivityIndicator />}
                  height={150}
                  width={150}
                />
              )
              : (
                <Image
                  containerStyle={[styles.imageBase]}
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  PlaceholderContent={<ActivityIndicator />}
                  height={150}
                  width={150}
                />
              )
          }
          <Text style={[styles.profileName]}> {`${firstName} ${lastName}`} </Text>
        </View>
        <View style={[styles.profileWidgetContainer]}>
          <View style={[styles.profileWidgetRow]}>
            <Switch
              value={currentUser.finderVisibility}
              onValueChange={(value) => {
                changeFinderVisibility(value);
              }}
              style= {[styles.profileWidgetItem]}
            />
            <Text style= {[styles.profileWidgetItem]}>Partner Finder Visibility</Text>
          </View>
          <View style={[styles.profileWidgetRow]}>
            <Text style= {[styles.profileWidgetItem]}>Partners Found</Text>
            <Badge
              containerStyle={[styles.profileWidgetItem]}
              value="0"
              status="primary"
            />
          </View>
          <View style={[styles.profileWidgetRow]}>
            <Badge
              containerStyle={[styles.profileWidgetItem]}
              value={(allScheduledAvailability || []).length}
              status="primary"
            />
            <Text style= {[styles.profileWidgetItem]}>Requests Open</Text>
          </View>
          <View style={[styles.profileWidgetRow]}>
            <Text style= {[styles.profileWidgetItem]}>Upcoming meetups</Text>
            <Badge
              containerStyle={[styles.profileWidgetItem]}
              value="0"
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
    width: "100%",
    maxWidth: 150,
    maxHeight: 150,
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
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