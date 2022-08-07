import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, TextInput, Pressable } from 'react-native';
import { Text, Image } from 'react-native-elements';
import * as FileSystem from "expo-file-system";
import {Buffer} from "buffer";
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCurrentUserAsync, updateCurrentUserAsync, User } from '../../store/userSlice';
import { postPresignedUrl, putImageOnS3 } from '../../api/s3API';

interface Props {
  otherUser?: User | null;
};

const PersonalProfile: React.FC<Props> = ({ otherUser }) => {
  const [locationText, setLocationText] = useState('');
  const [personalBio, setPersonalBio] = useState('');
  const currentState = useAppSelector((state) => ({
    userState: state.userState,
  }));
  const dispatch = useAppDispatch();
  const { currentUser } = currentState.userState;
  if (!currentUser) {
    return (<View />);
  }

  const updatePersonalBio = (data: string, location: 'location' | 'bio') => {
    if (currentUser && location === 'location') {
      dispatch(updateCurrentUserAsync({ id: currentUser.id, updateBody: {
        location: data,
      }}));
    } else if (currentUser && location === 'bio') {
      dispatch(updateCurrentUserAsync({ id: currentUser.id, updateBody: {
        shortBio: data,
      }}));
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled === false) {
      const imageExt = result.uri.split('.').pop();
      const imageFileName = currentUser.email.split('@')[0];
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const buff = Buffer.from(base64, "base64");
      const preAuthPostUrl = await postPresignedUrl({ fileName: imageFileName, fileType: `${result.type}/${imageExt}`}).then((response) => response).catch((e) => {
        console.log(e);
        return e;
      });
      if (preAuthPostUrl.status === 201 && preAuthPostUrl.data) {
        await putImageOnS3(preAuthPostUrl.data, buff, `${result.type}/${imageExt}`).catch((e) => console.log(e));
        dispatch(updateCurrentUserAsync({ id: currentUser.id, updateBody: {
          profilePhoto: imageFileName,
        }}))
      }
    };
  };

  
  if (currentUser && !otherUser) {
    return (
      <View>
        <ScrollView>
          <View style={[styles.imageContainer, { borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 5 }]}>
            <Pressable onPress={pickImage}>
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
            </Pressable>
            <Text style={[styles.profileName]}> {`${currentUser.firstName} ${currentUser.lastName}`} </Text>
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.h4Heading]} h4>Current Location</Text>
            <TextInput
              style={[styles.inputBox]}
              placeholder='Enter where you currently live.'
              multiline
              numberOfLines={1}
              maxLength={255}
              defaultValue={currentUser.location || ''}
              onChangeText={(e) => setLocationText(e)}
              onEndEditing={() => updatePersonalBio(locationText, 'location')}
            />
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.h4Heading]} h4>Short Bio</Text>
            <TextInput
              style={[styles.inputBox]}
              placeholder='Enter some details about yourself.'
              multiline
              defaultValue={currentUser.shortBio || ''}
              numberOfLines={6}
              onChangeText={(e) => setPersonalBio(e)}
              onEndEditing={(e) => updatePersonalBio(personalBio, 'bio')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  if (otherUser) {
    return (
      <View>
        <ScrollView>
          <View style={[styles.imageContainer, { borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 5 }]}>
            {
              otherUser.imageGetURL
              && otherUser.imageGetURL.length > 0
                ? (
                  <Image
                    containerStyle={[styles.imageBase]}
                    style={[styles.image]}
                    source={{ uri: otherUser.imageGetURL }}
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
            <Text style={[styles.profileName]}> {`${otherUser.firstName} ${otherUser.lastName}`} </Text>
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.h4Heading]} h4>Current Location</Text>
            <Text>{otherUser.location}</Text>
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.h4Heading]} h4>Short Bio</Text>
            <Text>{otherUser.shortBio}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View></View>
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
  inputBox: {
    backgroundColor: 'white',
    minWidth: '90%',
    maxWidth: '90%',
    padding: 10,
  },
  h4Heading: {
    textAlign: 'center',
    margin: 10, 
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default PersonalProfile;

PersonalProfile.defaultProps = {
  otherUser: null,
};
