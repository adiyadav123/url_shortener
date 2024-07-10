"use client";

import { DataTableDemo } from "@/components/DataTable";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkPreview } from "@/components/ui/link-preview";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [Inputt, setInput] = useState("");
  const { toast } = useToast();
  const [ShortenUrl, setShortenUrl] = useState("Your URLs will be shown here...");
  const [OldUrl, setOldUrl] = useState("");
  const [Uid, setUid] = useState("");
  const [IsChecked, setIsChecked] = useState(false);
  const [RateLimit, setRateLimit] = useState("");

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("shortenedUrls")) {
      const dummyArray = [
        {
          clicks: 0,
          createdAt: 1720355260257,
          uid: "acde1c",
          url: "https://youtube.com/shorts/xD664dQWpDk?si=lP4Wr8SJ1GoVLZuZ",
          shortUrl: "https://ushort-gray.vercel.app/u/acde1c",
        },
      ];
      localStorage.setItem("shortenedUrls", JSON.stringify(dummyArray));
    }
  }, []);

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

    if (response.status === 429) {
      const data = await response.json();
      setRateLimit(data.message);
      return;
    } else {
      const data = await response.json();
      const url = data.shortenedUrl;

      const u = data.uid;
      const oldUrl = data.url;
      setShortenUrl(url);
      setOldUrl(oldUrl);

      const dta = {
        uid: Inputt,
        shortUrl: url,
        uid: u,
      };

      setIsChecked(true);

      const shortenedUrlsArray = localStorage.getItem("shortenedUrls");
      const shortenedUrls = JSON.parse(shortenedUrlsArray);
      shortenedUrls.push(dta);
      localStorage.setItem("shortenedUrls", JSON.stringify(shortenedUrls));
    }
  };

  return (
    <section className=" flex items-center justify-center min-h-screen max-w-screen flex-col bg-neutral-950 relative antialiased z-10">
      <div className=" relative h-[10px]"></div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-[60vh] p-5 relative">
        <Input
          className="md:w-[70%] w-[100%] h-[12%] border-4 hover:border-[#D0A2F7] rounded-3xl p-5 transition-all duration-500 text-[#9572b3] z-10"
          placeholder="Enter URL"
          onChange={updateInput}
        />
        <Button
          className=" mt-2 md:mt-0 md:ml-2 md:h-[12%] md:w-[20%] w-[100%] border-4 hover:border-[#D0A2F7] p-5 rounded-3xl bg-[#F1EAFF] hover:bg-[#000000] hover:text-white transition-all duration-500 text-black relative z-10"
          onClick={shortURL}
        >
          Shorten URL
        </Button>
      </div>

      <div className="z-10 text-center">
        <h1 className="text-[20px] font-bold text-center">Shortened URL</h1>
        <div className="h-[10px]"></div>
        {RateLimit ? (
          <h1 className="text-[20px] font-bold text-center text-red-500">
            {RateLimit}
          </h1>
        ) : (
          <>
            <div className="text-[#9572b3]">
              <LinkPreview url={ShortenUrl}>{ShortenUrl}</LinkPreview>
            </div>
            <div className="h-[10px]"></div>
            <div className="text-[#9572b3]">
              <LinkPreview url={OldUrl}>{OldUrl}</LinkPreview>
            </div>
          </>
        )}
      </div>

      <div className=" w-[80%] z-10">
        <DataTableDemo />
      </div>

      <footer className="w-full h-[8vh] flex items-center justify-center fixed left-0 bottom-0 bg-[#34333534] z-30 backdrop-blur-3xl">
        <h1>
          Made with ❤️ by{" "}
          <LinkPreview url="https://github.com/adiyadav123">Aditya</LinkPreview>
        </h1>
      </footer>

      <BackgroundBeams />
    </section>
  );
}
