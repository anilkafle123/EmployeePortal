import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6D_6DRNC0JSi9TK33buy8gmxMjCShfIw",
  authDomain: "employeeportal-10e23.firebaseapp.com",
  projectId: "employeeportal-10e23",
  storageBucket: "employeeportal-10e23.firebasestorage.app",
  messagingSenderId: "1036718592711",
  appId: "1:1036718592711:web:01e7c7059fa85026b9e4e2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
