import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { logoutAction } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';

interface Props {};

const Settings: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const logout = async () => {
    await SecureStore.deleteItemAsync('jwt');
    dispatch(logoutAction());
  }

  return (
    <View>
      <ScrollView>
        <View style={[styles.buttonContainer]}>
            <Button
              containerStyle={[styles.navButton]}
              title={'Logout'}
              onPress={logout}
            />
            <Button
              containerStyle={[styles.navButton]}
              title={'Send Feedback'}
              onPress={() => Linking.openURL('https://forms.gle/a7v2bc1BSqWQ1tMY7')}
            />
          </View>
        </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    marginTop: 40,
    minWidth: '50%',
  }
})

export default Settings;