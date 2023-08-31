
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC5jMrWvWHKB7uQ8IUGK4SlxD3Gxjg32_w",
  authDomain: "food-station-79bd3.firebaseapp.com",
  databaseURL: "https://food-station-79bd3-default-rtdb.firebaseio.com",
  projectId: "food-station-79bd3",
  storageBucket: "food-station-79bd3.appspot.com",
  messagingSenderId: "775806515119",
  appId: "1:775806515119:web:dec9bde835ed4fa8bda15a"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth();

export {app, auth};