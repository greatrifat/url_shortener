
import { NextResponse } from "next/server";
import { nanoid } from 'nanoid'
import connectDB from "../../../../connection/mongoose";
import URL from "../../../../model/url";
/* Okay */
  
export async function POST(req) {

 try{
    await connectDB();
    const { originalUrl } = await req.json();
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    const urlId = nanoid(5);

    let url = await URL.findOne({ originalUrl });
        if (url) {
          return NextResponse.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;
          const newUrl = new URL({
            urlId,
            originalUrl,
            shortUrl,
            accessCount: 0,
          });
          await newUrl.save();
          return NextResponse.json(newUrl);
        }
      
 } catch (error) {
  console.error('Link Creating:', error);
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
 }

}


