import React, { useState } from  'react';
import { View, TextInput, Image, TextInputBase, Button } from 'react-native';

import firebase from 'firebase';
import { Navigation } from '@material-ui/icons';
require("firebase/firestore");
require("firebase/firebase-storage");



export default function Save(props) {
    const [caption, setCaption] = useState("")

        //This fetch is responsible for getting the uri of the image and posting to firebase
    const uploadImage = async() => {
        const uri = props.route.params.image
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)


        const response = await fetch(uri)
        const blob = await response.blob();

        const task = firebase
                    .storage()
                    .ref()
                    .child(childPath)
                    .put(blob);
                const taskProgress = snapshot => {
                    console.log(`tranferred: ${snapshot.bytesTransferred}`)
                }

                const taskCompleted = () => {
                    task.snapshot.ref.getDownloadURL().then((snapshot) =>{
                        savePostData(snapshot);
                        console.log(snapshot)
                    } )
                }

                const taskError = snapshot => {
                    console.log(snapshot)
                }

                task.on("state_changed", taskProgress, taskError, taskCompleted );
    };

    const savePostData = (downloadURL) => {

        firebase.firestore()
            .collection('post')
            .doc(firebase.auth()
            .currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()

            }).then((function () {
                props.navigation.popToTop()
            }))
    }


    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.image}}/>
            <TextInput
            placeholder="Write a caption . . ."
            onChangeText={(caption) => setCaption(caption)}/> 
            <Button
            title="Publish"
            onPress={() => uploadImage()}/>
        </View>
    )
};
