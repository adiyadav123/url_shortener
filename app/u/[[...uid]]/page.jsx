"use client"

import { child, get, getDatabase, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {

  const router = useRouter();

  const [RedirectUrl, setRedirectUrl] = useState('');
  const [Clicks, setClicks] = useState('');
  const [TimeCreated, setTimeCreated] = useState('');
  const [Message, setMessage] = useState('');
   
  const [Sec, setSec] = useState(5);

  const checkUrl = async(uid) => {
    const response = await fetch(`/api/redirect/`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ uid: uid, clicks: 1 })
    });
    const data = await response.json();

    if(data.error) {
      console.log(data.error);
    }

    setRedirectUrl(data.url);
    setClicks(data.clicks);
    setTimeCreated(data.createdAt);

    setTimeout(() => {
      setSec(0);
    }, 5000);

  }

  useEffect(() => { 
    checkUrl(params.uid);
  }, []);

  useEffect(() => {
    if(Sec == 0) {
      router.push(RedirectUrl);
    }
  }, [Sec])

  const dateObj = new Date(TimeCreated);
  const dateString = dateObj.toLocaleDateString();
  const timeString = dateObj.toLocaleTimeString();
  
  return (
    <div>
        <h1>Page</h1>
        <p>UID: {params.uid}</p>
        <p>Redirect URL: {RedirectUrl}</p>
        <p>Clicks: {parseInt(Clicks)+1}</p>
        <p>Date Created: { dateString }</p>
        <p>Time Created: { timeString }</p>

        <span>Redirecting you in {Sec} seconds. {Message}</span>
    </div>
  );
};

export default Page;
