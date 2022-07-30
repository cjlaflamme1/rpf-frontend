import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import RootNavigation from './navigation/RootNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={style.safeArea}>
        <Provider store={store}>
          <RootSiblingParent>
            <RootNavigation />
          </RootSiblingParent>
        </Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
})
