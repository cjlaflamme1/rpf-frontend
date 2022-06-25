import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { SignupObject } from '../../models/SignupObject';

interface Props {
  signupModel: {
    signupObject: SignupObject;
    setSignupObject: Function;
  }
};

const SignUpStepTwo: React.FC<Props> = ({ signupModel }) => {
  const { signupObject, setSignupObject } = signupModel;
  const [photo, setPhoto] = useState(null);
  /*
    const createFormData = (photo, body = {}) => {
      const data = new FormData();
  
      data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
  
      Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
      });
  
      return data;
    };
  
    const handleChoosePhoto = () => {
      launchImageLibrary({ noData: true }, (response) => {
        // console.log(response);
        if (response) {
          setPhoto(response);
        }
      });
    };
  
    const handleUploadPhoto = () => {
      fetch(`${SERVER_URL}/api/upload`, {
        method: 'POST',
        body: createFormData(photo, { userId: '123' }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }; Upload images: https://www.reactnativeschool.com/how-to-upload-images-from-react-native
    */

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
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={{ width: 150, height: 150, marginBottom: 10 }}
        height={150}
        width={150}
      />
      <Button style={[styles.button]} title="Choose Photo" onPress={() => console.log('clicky')} />
      {/* {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}
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