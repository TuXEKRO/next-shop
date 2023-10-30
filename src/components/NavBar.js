import { fetchJson } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [user, setUser] = useState()
    useEffect(() => {
        (async () => {
            try {
                const user = await fetchJson("api/user")
                setUser(user)
            } catch (error) {
                // not signed in
            }
        })();
    }, [])

    const handleSignOut = async () => {
        await fetch("/api/logout")
        setUser(undefined)
    }

    return (
        <nav className="px-2 py-1 text-sm">
            <ul className="flex gap-2">
                <li className="text-lg font-extrabold">
                    <Link href="/">Next Shop</Link>

                </li>
                <li role="separator" className="flex-1" />
                {user ? (
                    <>
                        <li>
                            {user.name}
                        </li>
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link href="/sign-in">Sign In</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}