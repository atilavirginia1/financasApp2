import React from 'react';
import { View, Text, StatusBar, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import firebase from './src/services/firebaseConnection';
import Routes from './src/routes/index';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

LogBox.ignoreAllLogs();

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}