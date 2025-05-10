"use client";
import ImageCarousel from "@/components/shared/ImageCarousel";
import Navbar from "@/components/shared/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { Pin } from "@/components/shared/LeafletMap";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const LeafletMap = dynamic(() => import("@/components/shared/LeafletMap"), {
    ssr: false,
});

const pins: Pin[] = [
    { id: 1, position: [51.4823606, -3.1825207] }, // Cardiff Castle
    { id: 2, position: [51.5760923, -3.2228239] }, // Caerphilly Castle
    { id: 3, position: [51.5357254, -3.2558339] }, // Castell Coch
    { id: 3, position: [51.4863826, -3.2689194] }, // St Fagans
];
import castles from "../../public/data/castles.json";

export default function Home() {
    const castlesImages = ["/Caerphilly Castle.jpg", "/Castell Coch.jpg", "/St Fagans.jpg", "/Cardiff Castle.jpg"];
    const router = useRouter();

    const handlePinClick = (id: number) => {
        router.push(`/castles/${castles[id - 1].name}`);
    };

    return (
        <>
            <Navbar />
            <h1 className="text-[64px] pl-[10vw]">Castles</h1>
            <div className="flex justify-center items-center">
                <ImageCarousel images={castlesImages} />
            </div>

            <div className="flex justify-center items-start gap-8 mt-4 px-[10vw]">
                <div className="w-1/2 h-[35vh] rounded-md shadow-md">
                    <LeafletMap pins={pins} onPinClick={handlePinClick} />
                </div>

                <Card className="w-1/2 bg-white shadow-md rounded-lg">
                    <CardContent>
                        <h1 className="text-3xl font-semibold mb-4">List of Castles</h1>
                        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500 marker:text-lg">
                            <li className="text-lg text-gray-700">CARDIFF CASTLE</li>
                            <li className="text-lg text-gray-700">CASTELL COCH</li>
                            <li className="text-lg text-gray-700">CAERPHILLY CASTLE</li>
                            <li className="text-lg text-gray-700">ST FAGAN’S CASTLE</li>
                            <li className="text-lg text-gray-700">PLACEHOLDER CASTLE 1</li>
                            <li className="text-lg text-gray-700">PLACEHOLDER CASTLE 2</li>
                            <li className="text-lg text-gray-700">PLACEHOLDER CASTLE 3</li>
                            <li className="text-lg text-gray-700">PLACEHOLDER CASTLE 4</li>
                            <li className="text-lg text-gray-700">PLACEHOLDER CASTLE 5</li>
                            <Link href={"/castles"} className="text-blue-500 hover:text-blue-600">
                                <li className="text-lg">More...</li>
                            </Link>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
