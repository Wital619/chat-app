import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

  getUser = id => this.db.ref(`users/${id}`);
  getUsers = () => this.db.ref('users');
  getMessage = id => this.db.ref(`messages/${id}`);
  getMessages = () => this.db.ref('messages');
  getRoomMessages = commonid => this.db.ref(`rooms/${commonid}`);
}

export default Firebase;
