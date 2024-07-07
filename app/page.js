"use client";

import { DataTableDemo } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Home() {
  const [Inputt, setInput] = useState("");
  const { toast } = useToast();
  const [ShortenUrl, setShortenUrl] = useState("");
  const [OldUrl, setOldUrl] = useState("");

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  const shortURL = async () => {
    if (!Inputt.length) {
      return toast({
        title: "Error",
        description: "Please enter a valid URL",
      });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/short`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ url: Inputt }),
    });
    const data = await response.json();
    const url = data.shortenedUrl;
    const oldUrl = data.url;
    setShortenUrl(url);
    setOldUrl(oldUrl);


    const analytics = async() => {
      const data = {
        uid: Inputt
      }
    }

  };

  return (
    <section className=" flex items-center justify-center h-screen w-screen flex-col">
      <h1 className=" lg:text-[30px] md:text-[30px] text-black mt-10 font-bold ">
        Url Shortener
      </h1>
      <div className="h-[10px]"></div>
      <div className=" flex items-center justify-center w-full h-[60vh] p-5">
        <Input
          className="w-[70%] h-[12%] border-4 hover:border-[#D0A2F7] rounded-3xl p-5 transition-all duration-500 text-[#9572b3]"
          placeholder="Enter URL"
          onChange={updateInput}
        />
        <Button
          className=" ml-2 h-[12%] border-4 hover:border-[#DOA2F7] p-4 rounded-3xl bg-[#F1EAFF] hover:bg-[#D0A2F7]   transition-all duration-500  text-black"
          onClick={shortURL}
        >
          Shorten URL
        </Button>
      </div>

      <p>{ShortenUrl}</p>
      <p>{OldUrl}</p>

      <div className=" w-[80%]">
        <DataTableDemo />
      </div>
    </section>
  );
}
