import { initializeApp } from "firebase/app";
import config from "./firebase-config.js";

export default function firebaseInit () {
  initializeApp(config);
  
}