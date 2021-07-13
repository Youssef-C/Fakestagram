import { StatusBar } from 'expo-status-bar';
import React from 'react';

import firebase from 'firebase'; 
const firebaseConfig = {
  apiKey: "AIzaSyAXnOYXD6Mk_E8j15uk8D4b-tNKjg8NomY",
  authDomain: "instagram-dev-ed346.firebaseapp.com",
  projectId: "instagram-dev-ed346",
  storageBucket: "instagram-dev-ed346.appspot.com",
  messagingSenderId: "935359144131",
  appId: "1:935359144131:web:8d2a3d4186d09585134276",
  measurementId: "G-P3R1E0MMZY"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './Components/auth/Landing';
import RegisterScreen from './Components/auth/Register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
