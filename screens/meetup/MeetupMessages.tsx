import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createClimbMessageAsync, getAllClimbMeetupsAsync, getOneClimbMeetupAsync, updateClimbMessageAsync } from '../../store/climbMeetupSlice';

interface Props {
  navigation: any;
};

const MeetupMessages: React.FC<Props> = ({ navigation }) => {
  const [messageDraft, setMessageDraft] = useState('');
  const scrollViewRef = useRef<KeyboardAwareScrollView|null>(null);
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

  const readMessage = async (messageId: string) => {
    await dispatch(updateClimbMessageAsync({
      id: messageId,
      updateBody: {
        read: true,
      },
    }));
  };

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
    if (
      currentUser
      && selectedClimbMeetup
      && selectedClimbMeetup.messages
      && selectedClimbMeetup.messages.length > 0
    ) {
      const relevantMessages = selectedClimbMeetup.messages.filter((mess) => (mess.user.id !== currentUser.id) && !mess.read);
      if (relevantMessages && relevantMessages.length > 0) {
        relevantMessages.map((mess) => readMessage(mess.id));
        dispatch(getAllClimbMeetupsAsync());
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
      <KeyboardAwareScrollView
        scrollsToTop={false}
        ref={scrollViewRef}
        onLayout={() => scrollViewRef?.current?.scrollToEnd()}
        onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}
        // style={[styles.scrollContainer]}
        contentContainerStyle={[styles.scrollContainer]}
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
                        <Text style={[styles.messageText]}>
                          {message.message}
                        </Text>
                      </View>
                    </View>
                  );
                }
                return (
                  <View style={[styles.singleMessageContainer]} key={`climb-message-${index}`}>
                    <View style={[styles.otherUserMessage]}>
                      <Text style={[styles.messageText]}>
                        {message.message}
                      </Text>
                    </View>
                    <View style={[styles.emptyContainer]} />
                  </View>
                )
              })
          }
        </View>
        <View style={[styles.inputParentContainer]}>
          <Input
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
      </KeyboardAwareScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  inputParentContainer: {
    width: '90%',
    minWidth: '90%',
    maxWidth: '90%',
    flexDirection: 'row',
  },
  scrollContainer: {
    justifyContent: 'space-between',
    minHeight: '90%',
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
    maxWidth: '60%',
    backgroundColor: '#DAEAEF',
    flexGrow: 1,
    padding: 20,
    borderRadius: 20,
  },
  otherUserMessage: {
    justifyContent: 'flex-start',
    maxWidth: '60%',
    backgroundColor: '#9DBDC6',
    flexGrow: 1,
    padding: 20,
    borderRadius: 20,
  },
  messageText: {
    fontSize: 18,
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