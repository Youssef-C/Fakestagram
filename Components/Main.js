import React, { Component } from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  
import firebase from 'firebase';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from './Main/Feed';
import ProfileScreen from './Main/Profile';
import SearchScreen from './Main/Search';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../Redux/Actions/index';
import { Provider } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
};

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }
    render() {
        return (
                    <Tab.Navigator initialRouteName="Feed" labeled={false}>
                        <Tab.Screen name="Feed" component={FeedScreen}
                        options={{
                            tabBarIcon: ({color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26}/>
                            ),
                        }} />

                        <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                        options={{
                            tabBarIcon: ({color, size }) => (
                                <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                            ),
                        }}/>

                        <Tab.Screen name="AddContainer" component={EmptyScreen}
                        listeners={({ navigation })=> ({
                            tabPress: event => {
                                event.preventDefault()
                                navigation.navigate("Add")
                            }
                        })}
                        options={{
                            tabBarIcon: ({color, size }) => (
                                <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                            ),
                        }} />

                        <Tab.Screen name="Profile" component={ProfileScreen}
                        listeners={({ navigation })=> ({
                            tabPress: event => {
                                event.preventDefault()
                                navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                            }
                        })}

                        options={{
                            tabBarIcon: ({color, size }) => (
                                <MaterialCommunityIcons name="account-box" color={color} size={26}/>
                            ),
                        }} />
                    </Tab.Navigator>
        )
    }
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
});

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);  
