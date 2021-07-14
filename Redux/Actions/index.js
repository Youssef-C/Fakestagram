import { USER_STATE_CHANGE } from '../Constants/index';
import firebase from 'firebase';
import { concat } from 'lodash';

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
        .collection("user")
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