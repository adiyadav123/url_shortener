"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Home() {

  const [Inputt, setInput] = useState('');
  const {toast} = useToast();
  const [ShortenUrl, setShortenUrl] = useState('');
  const [OldUrl, setOldUrl] = useState('');

  const updateInput = (e) => {
    setInput(e.target.value);
  }

  const shortURL = async() => {

    if(!Inputt.length) {
     return toast({
        title: "Error",
        description: "Please enter a valid URL",      
      })
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/short`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ url: Inputt })
    });
    const data = await response.json();
    const url = data.shortenedUrl;
    const oldUrl = data.url;
    setShortenUrl(url);
    setOldUrl(oldUrl);
  }

  return (
    <section className=" flex items-center justify-center h-screen w-screen flex-col">
      <h1 className=" lg:text-[30px] md:text-[20px]">Url Shortener</h1>
      <div className="h-[10px]"></div>
      <div className=" flex items-center justify-center">
        <Input placeholder="Enter URL" onChange={updateInput} />
        <Button className=" ml-2" onClick={shortURL}>Shorten URL</Button>

      </div>

      <p>Shortened Url: {ShortenUrl}</p>
      <p>Old Url: {OldUrl}</p>

    </section>
  )
}
