import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={style.safeArea}>
          <RootNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1
  }
})
