import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

  // const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
  class Firebase {
      constructor() {
          app.initializeApp(firebaseConfig);
          this.auth = app.auth();
          this.db = app.database();
          this.googleProvider = new app.auth.GoogleAuthProvider();
          // this.facebookProvider = new app.auth.FacebookAuthProvider();
      }

      emailSignUp(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password);
      }

      emailSignIn(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
      }

      signOut() {
        return this.auth.signOut();
      }

      resetPassword(email) {
        return this.auth.sendPasswordResetEmail(email);
      }

      updatePassword(password) {
        return this.auth.currentUser.updatePassword(password);
      }

      emailVerification() {
        return this.auth.currentUser.sendEmailVerification({
          url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
        });
      }

      googleSignIn() {
        return this.auth.signInWithPopup(this.googleProvider);
      }

      user(uid) {
        return this.db.ref(`users/${uid}`);
      }

      users() { 
        return this.db.ref('users'); 
      }
  }

  export default Firebase;
