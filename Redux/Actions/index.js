import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../Constants/index';
import firebase from 'firebase';
import { concat } from 'lodash';

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
            }
            else{
                console.log('does not exist');
            }
        })
    })
};

//Gets a users posts based on their userID, and orders the posts by ascending order based on the timestamp in firebase
export function fetchUserPosts(){
    return((dispatch) => {
        firebase.firestore()
        .collection("post")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
            let posts = snapshot.docs.map(doc => {
                 const data = doc.data();
                 const id = doc.id;
                 return{id, ...data}
            })
            dispatch({type: USER_POSTS_STATE_CHANGE, posts });
        })
    })
};