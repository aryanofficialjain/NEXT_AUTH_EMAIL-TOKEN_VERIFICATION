"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState({})
    const getInfo = async () => {
        try {
            const res = await axios.get('/api/user/me');
            console.log(res.data);
            if (res.data) {
                setData(res.data.data.user);
                router.push(`/profile/${res.data.data.user._id}`)
            }
        } catch (error: any) {
            console.log("Error while getting user information", error)
        }
    }

    const logout = async() => {
            try {
                const res = await axios.get("/api/user/logout");
                if(res.data.token === ""){
                    toast.success("Logout Succesfully")
                }
                router.push("/");
            } catch (error: any) {
                console.log("Error while logout", error);
                
            }
    }



    return (<>
        <h1>This is a Profile Page</h1>
        <button onClick={getInfo}>Get Info</button>
        <button onClick={logout}>Logout</button>
    </>)


}