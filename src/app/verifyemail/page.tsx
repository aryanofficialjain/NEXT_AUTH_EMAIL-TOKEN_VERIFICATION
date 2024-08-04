"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken]: any = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post("/api/user/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            console.log("Error while verifying the email: ", error);
            setError(true);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token]);


    return (
        <>
            <div>
                <h1>Verify Email</h1>
                {token ? (`${token}`) : ("No Token")}
            </div>
            {verified && <div>
                <h1>Email Verified</h1>

            </div>}

            {error && <div>
                <h1>Error</h1>
            </div>}
        </>
    )

}