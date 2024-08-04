"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Chaipage() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: ""
    });

    useEffect(() => {
        if (user.name.length > 0 && user.password.length > 0 && user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("api/user/signup", user);
            console.log(res.data);
            toast.success("Signup successful");
            if (res.data) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Error in signup", error);
            toast.error("Signup failed");
        } finally {
            setLoading(false);
        }

        console.log("Submitted user:", user);
    };

    return (
        <>
            <h1>Signup</h1>
            {loading ? "Processing" : "Loaded"}
            <form onSubmit={handleSubmit} className="text-black">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
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
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button>
                <Link href="/login">Visit Login</Link>
            </form>
        </>
    );
}