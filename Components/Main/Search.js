import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

require('firebase/firestore');

const styles = require('../Style');

export default function Search(props) {
    const [users, setUsers] = useState([]);

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then ((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data}; 
                });
                setUsers(users);
            });
    };

    return (
        <View style={styles.searchContainer}>
            <TextInput placeholder="Search for users..." 
            onChangeText={(search) => fetchUsers(search)} />

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.searchItems}
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                        <Text style={styles.searchItemText}> {item.name} </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};