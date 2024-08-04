import Link from "next/link"

export default function Home() {
  return <>
  <h3>Welcome</h3>
    <h1 className="text-2xl text-center">Home page</h1>
    <Link href="/login">Login</Link>
    <Link href="/signup">Signup</Link>
  </>
}