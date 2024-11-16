
"use client";
/* Okay*/
import { useState } from "react";

export default function UrlShortener() {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setError("");
    setShortUrl(null);
    setLoading(true);

    if (!inputUrl) {
      setError("Please enter a URL.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${base}/api/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: inputUrl }),
      });

      if (!res.ok) {
        setError("Failed to shorten URL.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setShortUrl(data.shortUrl); // Assuming the API response includes `shortUrl`
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">URL Shortener</h1>
      <div className="flex flex-col items-center w-full max-w-md space-y-2">
        <input
          type="text"
          placeholder="Enter a URL to shorten"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="text-red-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleClick}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Processing..." : "Shorten URL"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {shortUrl && (
        <div className="flex items-center space-x-2">
          <p className="text-gray-700 bg-cyan-300 w-full px-4 py-2 border border-gray-300">{shortUrl}</p>
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}





// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center ">
//       <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
//         <div className="relative mt-10 h-px bg-gray-300">
//           <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
//             <span className="bg-white px-4 text-xs text-gray-500 uppercase">Url Shortener</span>
//           </div>
//         </div>
//         <div className="mt-10">
//           <form action="#">
//             <div className="flex flex-col mb-6">
//               <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">URL Address:</label>
//               <div className="relative">
//                 <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
//                   <svg
//                     className="h-6 w-6"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <circle cx="12" cy="12" r="10" />
//                     <path d="M2 12h20 M12 2a10 10 0 000 20 M4.6 7c3 6 7.8 6 11.8 0 M4.6 17c3-6 7.8-6 11.8 0" />
                    
//                     <rect x="7" y="16" width="10" height="2" rx="1" />
//                   </svg>
//                 </div>

//                 <input id="email" type="email" name="email" required className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-red-400" placeholder="paste the link here" />
//               </div>
//             </div>

//             <div className="flex w-full">
//               <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-cyan-500 hover:bg-cyan-700 rounded py-2 w-full transition duration-150 ease-in">
//                 <span className="mr-2 uppercase">Processed</span>
//                 <span>
//                   <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </span>
//               </button>
//             </div>

//           </form>
//         </div>

//       </div>
//     </div>

//   );
// }
