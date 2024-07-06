
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, update, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
  

const app = initializeApp(firebaseConfig);

const db = getDatabase();


function writeUrlData(url, uid,) {
  set(ref(db, 'urls/' + uid ),{
    url: url,
    uid: uid,
    clicks: 0,
    createdAt: Date.now()
  })
}

async function updateClicks(uid, clicks) {

  const dbRef = ref(getDatabase());

  var dt = [];
  await get(child(dbRef, `urls/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      dt.push(snapshot.val());
      console.log(snapshot.val());
      return dt;
    } else {
      console.log("No data available");
    }
  })

  update(ref(db, 'urls/' + uid), {
    clicks: parseInt(dt[0].clicks) + clicks
  })
}



export { app, writeUrlData, updateClicks };