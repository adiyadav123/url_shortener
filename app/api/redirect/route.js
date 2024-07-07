import { getUrlData, updateClicks } from "@/firebaseSetup";
import { child, get, getDatabase, ref } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  const uidObj = await request.json();
  if (!uidObj.uid) {
    return NextResponse.json({ error: "UID is required" }, { status: 400 });
  }

  const uid = uidObj.uid;
  const cl = uidObj.clicks;
  
  

  updateClicks(uid, cl);

  

  const dbRef = ref(getDatabase());
  var dt = [];

  await get(child(dbRef, `urls/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      dt.push(snapshot.val());

      NextResponse.json(dt);
    } else {
      var msg = "Data not found.";
      return dt.push(msg);
    }
  });

    return NextResponse.json(dt[0]);
}
