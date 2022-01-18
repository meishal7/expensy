import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_p8ZBKDobRkbFSnpB82RaXnaUJu5EpLo",
  authDomain: "expensy-db.firebaseapp.com",
  projectId: "expensy-db",
  storageBucket: "expensy-db.appspot.com",
  messagingSenderId: "990541103780",
  appId: "1:990541103780:web:5455de18797336be03dc31",
  databaseURL: "https://expensy-db-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);
