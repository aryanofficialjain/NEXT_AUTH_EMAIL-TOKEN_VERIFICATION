"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [token, setToken]: any = useState("");
    const [password, setPassword] = useState("")
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");

    const submit = async () => {
        try {
            const res = await axios.post("/api/user/forgot", {email, password });
            console.log(res.data);
            if(res.status === 200){
                setVerified(true);
                router.push("/profile");
                
            }
        } catch (error: any) {
            console.log("Error while verifying the email: ", error);
            setError(true);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <>
            <div>
                <h1>Verify Token</h1>
                {token ? (`${token}`) : ("No Token")}
            </div>
            <div>
                {verified && <h1>Token Verified</h1>}
                <input type="email" name="email" className="text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" className="text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={submit}>Submit</button>
            </div>

            {error && <div>
                <h1>Error</h1>
            </div>}
        </>
    )

}