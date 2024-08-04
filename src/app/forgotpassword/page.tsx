"use client"

import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const handlesubmit = async (event :any) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/user/resetemail", { email });
            console.log(res.data);
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? "Processing" : "Loaded"}
            <form onSubmit={handlesubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="text-black" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button type="submit">Send</button>
            </form>
            {error && <h1>Error</h1>}
        </>
    )
}