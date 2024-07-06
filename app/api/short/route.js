import { NextResponse } from "next/server";
import crypto from "crypto";
import { writeUrlData } from "@/firebaseSetup";



export async function POST(request) {
    const urlObj = await request.json();
    if (!urlObj.url){
        return NextResponse.json({ error: "URL is required"}, { status: 400 })
    }

    const url = urlObj.url;

    console.log(url);

    const uid = crypto.randomBytes(3).toString('hex');
    
    const baseURL = "http://localhost:3000/u";

    writeUrlData(url, uid);

    return NextResponse.json({ url: url, shortenedUrl: `${baseURL}/${uid}` });
}