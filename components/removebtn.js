"use client"
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({id}){
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const removeTopic = async() =>{
        const confirmed = confirm("Are you sure?");
       
        if(confirmed){
            const res = await fetch(`${base}/api/urls?id=${id}`,{
                method: "DELETE"
            });
            if(res.ok){
            router.refresh();
            }
            
        }
    }
    return(
        <button onClick={removeTopic} className="text-red-500">
            <HiOutlineTrash size={24}/>
        </button>
    )
}