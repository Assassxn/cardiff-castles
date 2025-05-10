"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Calendar } from "@/components/ui/calendar";

function formatDate(date: Date): string {
    const year = date.getFullYear();
    // getMonth() is zero-based, so add 1
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function WeatherLandingPage() {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    const router = useRouter();

    const onSelect = (date: Date) => {
        setSelected(date);
        const slug = formatDate(date);
        router.push(`/weather/${slug}`);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-xl flex flex-col items-center">
                    <div className="w-full px-6 py-4 border-b border-gray-200 text-center">
                        <h1 className="text-3xl font-semibold">Weather</h1>
                        <p className="mt-1 text-gray-600">Pick the date you would like to visit</p>
                    </div>

                    <div className="w-full p-6 flex justify-center">
                        <Calendar selected={selected} required mode="single" onSelect={(d) => d && onSelect(d)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
