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

class Firebase {
  constructor () {
    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.getUser(authUser.uid)
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

  getUsers = () => this.db.ref('users');
  getUser = id => this.db.ref(`users/${id}`);
  getUserRooms = id => this.db.ref(`users/${id}/rooms`);

  getRoomMessages = commonid => this.db.ref(`rooms/${commonid}`);

  getImage = filename => this.storage.ref(`images/${filename}`);
}

export default Firebase;
