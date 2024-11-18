"use client";
import { useState } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "../../../../components/removebtn";


export default  function Auth() {
    const admin_pass = process.env.NEXT_PUBLIC_ADMIN_PASS;
    const base = process.env.NEXT_PUBLIC_BASE_URL;

    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [login, setLogin] = useState(false);
    const [all_urls, setAll_urls] = useState();
    
    const getURLs = async() => {
      const res = await fetch(`${base}/api/urls`,{
        method: "GET"
      });
  
      if(!res.ok){
        throw new Error("Failled to fetch");
      }
      return res.json()
  }
    
    
    
    const handleLogIn = async () => {
      const {all_url} = await getURLs();
      console.log(all_url);
      setAll_urls(all_url);
        setError("");
        console.log(admin_pass);
        console.log(pass);
        if (!pass) {
            setError("Enter password");
            return;
          }
        else if (pass === admin_pass) {            
            setPass("");
            
            setLogin(true);
            return;
          }
        else{
            setError("Wrong password");
            return;
          }    
    }


    const handleLogOut = async () => {
            setLogin(false);
            return;   
    }

    

    
    

  return (
    <div className="flex flex-col items-center justify-center mt-4 p-4 space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        {!login && <div className="flex flex-col items-center w-full max-w-md space-y-2">
        <input
          type="text"
          placeholder="Enter Pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="text-red-500 w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleLogIn}
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 "
        > Log In
        </button>
        </div>
        }

        {error && <p className="text-red-500">{error}</p>}

        {login && <div className="flex flex-col items-center w-full space-y-2">
        
          {all_urls.map((t) => ( 
        <div key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">Url id: {t.urlId} Visit: {t.accessCount}</h2>
            <div>{t.shortUrl}</div>
            <div className="text-sm">{t.originalUrl}</div>
          </div>

          <div className="flex gap-2"> 
            <Link href={`/editURL/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
            <RemoveBtn id={t._id}/>
          </div>
        </div>
        ))}
        
        <button
          onClick={handleLogOut}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 "
        > Log Out
        </button>
        
        
        </div>
        }

    
    </div>

  )
}



 