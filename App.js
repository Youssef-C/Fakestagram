import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import {View, Text} from 'react-native';
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

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const{ loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
          return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
              </Stack.Navigator>
            </NavigationContainer>
          );
        }
          return(
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text>User is logged in!</Text>
            </View>
          )
        }
      }
    

export default App;
