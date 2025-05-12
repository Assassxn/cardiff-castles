import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import castles from "../../../../public/data/castles.json";
import ReviewsSection from "@/components/shared/ReviewsSection";
import Image from "next/image";
type Props = { params: Promise<{ id: string }> };

export default async function CastlePage({ params }: Props) {
    // get the castle id from the params
    const { id } = await params;
    // check if the id is valid
    const castle = castles.find((c) => c.name === decodeURIComponent(id));
    // if the castle is not found, return a 404 page
    if (!castle) notFound();

    return (
        <>
            <Navbar />
            <div className="max-w-[80vw] mx-auto px-4 py-6 space-y-10">
                <header className="space-y-2 md:w-1/2">
                    <h1 className="text-4xl font-bold">{castle.name}</h1>
                    <p className="text-lg text-muted-foreground">{castle.description}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full rounded-lg shadow-md overflow-hidden">
                        <Image src={`/${castle.image}`} alt={castle.name} className="w-full h-auto object-cover rounded-lg" />
                    </div>

                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-3xl">Things to do:</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-y-auto">
                            <ul className="list-disc list-inside space-y-1 marker:text-blue-500 text-lg">
                                {/* loop through the things to do and add it in a list */}
                                {castle.thingsToDo.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <ReviewsSection castleId={castle.name} initialReviews={castle.reviews} />
            </div>
        </>
    );
}
