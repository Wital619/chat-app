import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

app.initializeApp(config);

const auth = app.auth();
const db = app.database();
const storage = app.storage();

export const serverValue = app.database.ServerValue;

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => auth.signOut();

export const onAuthUserListener = (next, fallback) =>
  auth.onAuthStateChanged(authUser => {
    if (authUser) {
      getUser(authUser.uid)
        .once('value')
        .then(snapshot => {
          next({
            ...snapshot.val() 
          });
        });
    } else {
      fallback();
    }
  });

export const getUsers = () => db.ref('users');
export const getUser = id => db.ref(`users/${id}`);
export const getUserRooms = id => db.ref(`users/${id}/rooms`);

export const getRoomMessages = roomId => db.ref(`rooms/${roomId}/messages`);
export const getRoomLastMessage = roomId => db.ref(`rooms/${roomId}/last_message`);

export const getImage = filename => storage.ref(`images/${filename}`);