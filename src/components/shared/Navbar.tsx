import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const sessionEmail = localStorage.getItem("session");
        const stored = localStorage.getItem("users");
        if (sessionEmail && stored) {
            try {
                const users = JSON.parse(stored) as { name: string; email: string }[];
                const u = users.find((u) => u.email === sessionEmail);
                if (u) setUsername(u.name);
            } catch {
                console.warn("Failed to parse users from localStorage");
            }
        }
    }, []);
  
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
                {/* Left: Logo */}
                <div className="flex flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl" prefetch={false}>
                        Castles of Cardiff
                    </Link>
                </div>

                {/* Center: Navigation */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
                        <Link href="/castles" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                            Castles
                        </Link>
                        <Link href="/weather" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                            Weather
                        </Link>
                        <Link href="/faq" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                            FAQ
                        </Link>
                        <Link href="/account" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                            Account
                        </Link>
                    </nav>
                </div>

                {/* Weclome message if user is logged in */}
                {username && (
                    <div className="hidden md:block">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Welcome, {username}</span>
                    </div>
                )}
            </div>
        </header>
    );
}