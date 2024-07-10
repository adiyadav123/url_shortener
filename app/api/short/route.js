import { NextResponse } from "next/server";
import crypto from "crypto";
import { writeUrlData } from "@/firebaseSetup";
import rateLimit from "@/config/rateLimit";



export async function POST(request) {
    const urlObj = await request.json();
    if (!urlObj.url){
        return NextResponse.json({ error: "URL is required"}, { status: 400 })
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip") || request.headers.get("x-client-ip") || request.headers.get("fastly-client-ip") || request.headers.get("true-client-ip") || request.headers.get("x-true-client-ip") || request.headers.get("x-visitor-ip");

    const result = await rateLimit.limit(ip);

    if (!result.success) {
        return NextResponse.json({
            message: "Rate limit exceeded. Please try again later."
        }, { status: 429 });
    }

    const url = urlObj.url;

    console.log(url);

    const uid = crypto.randomBytes(3).toString('hex');
    
    const baseURL = `${process.env.NEXT_PUBLIC_URL}/u`;

    writeUrlData(url, uid);

    return NextResponse.json({ url: url, shortenedUrl: `${baseURL}/${uid}`, uid: uid });
}