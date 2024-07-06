import React, { useEffect } from "react";

const page = ({ params }) => {

  const checkUrl = async(uid) => {
    const response = await fetch(`/api/redirect/${uid}`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ uid: uid })
    });
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    checkUrl(params.uid);
  });
  
  return (
    <div>
        <h1>Page</h1>
        <p>UID: {params.uid}</p>
    </div>
  );
};

export default page;
