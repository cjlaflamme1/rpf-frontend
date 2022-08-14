import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Input, Text } from 'react-native-elements';
import { dateOnly } from '../../helpers/timeAndDate';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createClimbMessageAsync, getOneClimbMeetupAsync } from '../../store/climbMeetupSlice';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  navigation: any;
};

const MeetupMessages: React.FC<Props> = ({ navigation }) => {
  const [messageDraft, setMessageDraft] = useState('');
  const scrollViewRef = useRef<ScrollView|null>(null);
  const currentState = useAppSelector((state) => ({
    climbMeetupState: state.climbMeetupState,
    userState: state.userState,
  }));
  const dispatch = useAppDispatch();
  const { selectedClimbMeetup } = currentState.climbMeetupState;
  const { currentUser } = currentState.userState;

  const updateMessages = () => {
    if (selectedClimbMeetup) {
      dispatch(getOneClimbMeetupAsync(selectedClimbMeetup.id));
    };
  }

  useEffect(() => {
    if (
      currentUser
      && selectedClimbMeetup
      && selectedClimbMeetup.users
      && selectedClimbMeetup.users.length > 0
    ) {
      const otherUser = selectedClimbMeetup.users.find((u) => u.id !== currentUser.id);
      if (otherUser) {
        navigation.setOptions({title: `${otherUser.firstName}`})
      }
    }
    const refreshMessages = setInterval(() => {
      updateMessages();
    }, 5000);
    return () => {
      clearInterval(refreshMessages);
    }
  }, []);

  const submitMessage = async () => {
    if (selectedClimbMeetup && messageDraft && currentUser) {
      await dispatch(createClimbMessageAsync({
        message: messageDraft,
        climbMeetupId: selectedClimbMeetup.id,
      }));
      setMessageDraft('');
      dispatch(getOneClimbMeetupAsync(selectedClimbMeetup.id));
    }
  }

  if (!currentUser) {
    return (<View />)
  }
  return (
    <View style={[styles.pageContainer]}>
      <ScrollView
        scrollsToTop={false}
        ref={scrollViewRef}
        onLayout={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
        onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
      >
        <View style={[styles.messagesParentContainer]}>
          {
            selectedClimbMeetup
            && selectedClimbMeetup.messages
            && selectedClimbMeetup.messages.length > 0
            && selectedClimbMeetup.messages
              .slice()
              .sort((a, b) => a.createdAt.valueOf() < b.createdAt.valueOf() ? -1 : 1)
              .map((message, index) => {
                if (message.user.id === currentUser.id) {
                  return (
                    <View style={[styles.singleMessageContainer]} key={`climb-message-${index}`}>
                      <View style={[styles.emptyContainer]} />
                      <View style={[styles.currentUserMessage]}>
                        <Text>
                          {message.message}
                        </Text>
                      </View>
                    </View>
                  );
                }
                return (
                  <View style={[styles.singleMessageContainer]} key={`climb-message-${index}`}>
                    <View style={[styles.otherUserMessage]}>
                      <Text>
                        {message.message}
                      </Text>
                    </View>
                    <View style={[styles.emptyContainer]} />
                  </View>
                )
              })
          }
        </View>
      </ScrollView>
      <View style={[styles.inputParentContainer]}>
        <Input
          containerStyle={[styles.inputContainer]}
          placeholder="Comment"
          value={messageDraft}
          onChangeText={(value) => setMessageDraft(value)}
          autoCompleteType={undefined}
        />
        <Pressable
          onPress={submitMessage}
        >
          <MaterialCommunityIcons name="message" size={36} color="blue" />
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  inputParentContainer: {
    width: '90%',
    minWidth: '90%',
    maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer: {
    // width: '100%',
    // minWidth: '90%',
  },
  pageContainer: {
    marginTop: 10,
  },
  messagesParentContainer: {
    minWidth: '90%',
  },
  emptyContainer: {
    flexGrow: 1,
  },
  singleMessageContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  currentUserMessage: {
    justifyContent: 'flex-end',
    maxWidth: '50%',
  },
  otherUserMessage: {
    justifyContent: 'flex-start',
    maxWidth: '50%',
  },
  modalContainer: {
    width: '90%',
  },
  sectionContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    minWidth: '95%',
    maxWidth: '95%'
  },
  cardContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButton: {
    width: '100%',
    marginTop: 5,
  },
  cardSection: {
    marginTop: 3,
  },
  areaItem: {
    marginLeft: 5,
  }
})

export default MeetupMessages;