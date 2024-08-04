"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Chaipage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Submitted user:", user);

        try {
            setLoading(true);
            const res = await axios.post('/api/user/login', { email: user.email, password: user.password });
            console.log(res.data);
            if(res.data){
                router.push(`/profile`)
            }
        } catch (error) {
            console.log("Error while login", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Login</h1>
            {loading ? "Processing" : "Loaded"}
            <form onSubmit={handleSubmit} className="text-black">
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={user.email} 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={user.password} 
                    onChange={handleChange} 
                />
                <button type="submit" className="text-white" disabled={buttonDisabled}>
                    {buttonDisabled ? "No Login" : "Login"}
                </button>
                <Link href="/signup">Visit to Signup</Link>
            </form>
            <Link href="/forgotpassword" className="text-sky-500">Forgot Password</Link>
        </>
    );
}