import { auth } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => auth.signOut();

export const onAuthUserListener = (next, fallback) =>
  auth.onAuthStateChanged(authUser => {
    if (authUser) {
      authUser = {
        uid: authUser.uid,
        email: authUser.email,
      };

      next(authUser);
    } else {
      fallback();
    }
  });