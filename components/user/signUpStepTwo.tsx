import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { SignupObject } from '../../models/SignupObject';
import * as FileSystem from "expo-file-system";
import { postPresignedUrl } from '../../api/s3API';
import {Buffer} from "buffer";

interface Props {
  signupModel: {
    signupObject: SignupObject;
    setSignupObject: Function;
  },
  photo: {
    photo: File | undefined;
    setPhoto: Function;
  }
};

const SignUpStepTwo: React.FC<Props> = ({ signupModel, photo }) => {
  const { signupObject, setSignupObject } = signupModel;
  const [image, setImage] = useState<{ localUri: string }>();

  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    console.log(blob);
    return blob;
  };
  
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
      const imageFileName = signupObject.email.split('@')[0];
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const buff = Buffer.from(base64, "base64");
      photo.setPhoto(buff);
      setImage({ localUri: result.uri });
      setSignupObject({ ...signupObject, profilePhoto: `${imageFileName}.${imageExt}` });
    };
  };

  return (
    <View style={[styles.inputContainer]}>
      <Input
        placeholder="First Name"
        label="First Name"
        value={signupObject.firstName}
        onChangeText={(text) => setSignupObject({ ...signupObject, firstName: text })}
        autoCompleteType={'name'}
        autoCorrect={false}
        inputContainerStyle={[styles.inputContainer]} />
      <Input
        placeholder="Last Name"
        label="Last Name"
        autoCompleteType={'name'}
        value={signupObject.lastName}
        onChangeText={(text) => setSignupObject({ ...signupObject, lastName: text })}
        autoCorrect={false}
        inputContainerStyle={[styles.inputContainer]} />
      {image && (
          <Image
            source={{ uri: image.localUri }}
            style={{ width: 150, height: 150 }}
            height={150}
            width={150} 
          />
      )}
      <Button style={[styles.button]} title="Choose Photo" onPress={pickImage} />
    </View>
  )
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: 150
  }
})

export default SignUpStepTwo;