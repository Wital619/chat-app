import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const devConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

app.initializeApp(devConfig);

const db = app.database();
const auth = app.auth();

export {db, auth};
