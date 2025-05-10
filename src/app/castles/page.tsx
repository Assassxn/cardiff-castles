"use client";

import Navbar from "@/components/shared/Navbar";
import castles from "../../../public/data/castles.json";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";


export default function Castles() {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push("/castles/" + castles[parseInt(e.currentTarget.id)].name);
    };

    return (
        <>
            <Navbar />
            {castles.map((castle, index) => (
                <>
                    {index === 0 && (
                        <div className="pl-[calc(20vw+1.5rem)] text-left">
                            <h1 className="text-4xl font-bold mb-2 pt-4">Castles</h1>
                            <p className="text-muted-foreground text-lg">A list of all the castles you can find in Cardiff</p>
                        </div>
                    )}
                    <div key={index} className="flex flex-col md:flex-row items-stretch gap-6 p-6 max-w-[60vw] mx-auto">
                        <div className="w-full md:w-64 h-64">
                            <Image
                                onClick={handleClick}
                                id={index.toString()}
                                src={"/" + castle.image}
                                alt={castle.name}
                                width={1024}
                                height={1024}
                                className="object-cover w-full h-full rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
                            />
                        </div>

                        <Card className="flex-1 h-64 transition-transform duration-300 hover:scale-[1.01] shadow-md rounded-2xl cursor-pointer" onClick={handleClick} id={index.toString()}>
                            <CardContent className="h-full flex flex-col p-6">
                                <h1 className="text-3xl font-bold mb-2">{castle.name}</h1>
                                <p className="text-muted-foreground text-base overflow-hidden text-ellipsis line-clamp-5">{castle.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                </>
            ))}
        </>
    );
}
