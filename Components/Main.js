import React, { Component } from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from './Main/Feed';
import AddScreen from './Main/Add';
import ProfileScreen from './Main/Profile';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../Redux/Actions/index';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        return (
                    <Tab.Navigator>
                        <Tab.Screen name="Feed" component={FeedScreen}
                        options={{
                            tabBarIcon: ({color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26}/>
                            ),
                        }} />

                        <Tab.Screen name="Add" component={AddScreen}
                        options={{
                            tabBarIcon: ({color, size }) => (
                                <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                            ),
                        }} />

                        <Tab.Screen name="Profile" component={ProfileScreen}
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

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);  
