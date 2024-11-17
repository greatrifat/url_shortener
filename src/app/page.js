
"use client";
/* Okay*/
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function UrlShortener() {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

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
      setShortUrl(data.shortUrl);
      setCount(data.accessCount);
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
    <div className="flex flex-col items-center justify-center mt-4 p-4 space-y-4">
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
        <div className="flex flex-col items-center space-x-2 border p-4">
          
          <div className="flex items-center space-x-2"> 
          <p className="text-gray-700 bg-cyan-300 px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md space-y-2">{shortUrl}</p>
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Copy
          </button>
          </div>

          <div className="flex items-start space-x-2 p-4" > 
          <p className="text-gray-50 px-4 py-2  w-full max-w-md space-y-2"> Access Count: {count}</p>
          
          </div>

        </div>
        
      )}
      <h1 className="text-sm font-serif flex items-center pt-12">Made with <FaHeart className="mx-1 text-red-500" /> by &nbsp;<a 
         href="https://github.com/greatrifat" target="_blank" rel="noopener noreferrer" className=" font-bold hover:text-red-200">Robayet</a></h1>

    </div>
  );
}


