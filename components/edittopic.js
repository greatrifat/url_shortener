"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopic({id, title, description }){
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const router = useRouter();
  
    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/topics/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body : JSON.stringify({newTitle, newDescription})
                }
            );

            if(!res.ok){
                throw new Error("Failed to update");
            }
            router.refresh();
            router.push("/");

        }catch(error){
         console.log(error);
        }

    }
    
    return <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
    <input 
    onChange={(e)=>setNewTitle(e.target.value)}
    value={newTitle}
    className="border border-slate-500 px-8 py-2"
    type="text" placeholder="New Topic Title"></input>

    <input 
    onChange={(e)=>setNewDescription(e.target.value)}
    value={newDescription}
    className="border border-slate-500 px-8 py-2"
    type="text" placeholder="New Topic Description"></input>

    <button type="submit" className=" text-white bg-green-800 px-4 py-2 w-fit">Update Topic</button>
</form>

}