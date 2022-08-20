import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl, AppState } from 'react-native';
import { Badge, Button, Switch, Text } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { getAllclimbAvailabilityScheduledAsync } from '../../store/climbAvailabilityScheduledSlice';
import { getAllClimbMeetupsAsync } from '../../store/climbMeetupSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateCurrentUserAsync } from '../../store/userSlice';

interface Props {
  navigation: any
};

const UserLanding: React.FC<Props> = ({ navigation }) => {
  const appState = useRef(AppState.currentState);
  const [currentUnreadMessages, setCurrentUnreadMessages] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const currentState = useAppSelector((state) => ({
    userState: state.userState,
    climbAvailabilityScheduledState: state.climbAvailabilityScheduledState,
    climbMeetupState: state.climbMeetupState,
    climbRequestState: state.climbRequestState,
  }));
  const dispatch = useAppDispatch();

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const _handleAppStateChange = (nextAppState: any) => {
    appState.current = nextAppState;
  };
  
  const { currentUser } = currentState.userState;
  const { allScheduledAvailability } = currentState.climbAvailabilityScheduledState;
  const { allClimbMeetups } = currentState.climbMeetupState;
  const { allClimbRequests } = currentState.climbRequestState;
  
  const changeFinderVisibility = (checked: boolean) => {
    if (currentUser) {
      dispatch(updateCurrentUserAsync({
        id: currentUser.id,
        updateBody: {
          finderVisibility: checked,
        },
      }))
    }
  }
  const getUnreadMessages = () => {
    let count = 0;
    if (currentUser) {
      if (allClimbMeetups && allClimbMeetups.length > 0) {
        allClimbMeetups.map((meetup) => {
          if (meetup.messages && meetup.messages.length > 0) {
            const relevantMessages = meetup.messages.filter((mess) => mess.user.id !== currentUser.id);
            if (relevantMessages && relevantMessages.length > 0) {
              relevantMessages.map((mess) => {
                if (!mess.read) {
                  count++;
                }
              })
            }
          }
        })
      };
    }
    setCurrentUnreadMessages(count);
    return count;
  };

  const updatePageData = () => {
    if (
      currentState.userState.currentUser
      && appState.current === 'active'
    ) {
      dispatch(getAllclimbAvailabilityScheduledAsync());
      dispatch(getAllClimbMeetupsAsync());
      getUnreadMessages();
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", _handleAppStateChange);
    updatePageData();
    const refreshPage = setInterval(() => {
      updatePageData();
    }, 15000);
    return () => {
      clearInterval(refreshPage);
      subscription.remove();
    }
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updatePageData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={[{ width: '100%'}]}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {
          !currentUser
          && (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" />
            </View>
          )
        }
        {
          currentUser
          && (
            <>
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
                <Text style={[styles.profileName]}> {`${currentUser.firstName} ${currentUser.lastName}`} </Text>
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
                  <Text style= {[styles.profileWidgetItem]}>Unread Messages</Text>
                  <Badge
                    containerStyle={[styles.profileWidgetItem]}
                    value={currentUnreadMessages}
                    status="primary"
                  />
                </View>
                <View style={[styles.profileWidgetRow]}>
                  <Badge
                    containerStyle={[styles.profileWidgetItem]}
                    value={(allClimbRequests?.filter((req) => req.targetAccepted === null) || []).length}
                    status="primary"
                  />
                  <Text style= {[styles.profileWidgetItem]}>Requests Open</Text>
                </View>
                <View style={[styles.profileWidgetRow]}>
                  <Text style= {[styles.profileWidgetItem]}>Upcoming meetups</Text>
                  <Badge
                    containerStyle={[styles.profileWidgetItem]}
                    value={(allClimbMeetups || []).length}
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
            </>
          )
        }
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default UserLanding;