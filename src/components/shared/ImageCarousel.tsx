import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

interface ImageCarouselProps {
    images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    return (
        <Carousel className="w-screen max-w-[80vw]">
            <CarouselContent>
                {/* mapping all images provided in params into a carousel */}
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <Card className="h-[50vh] overflow-hidden w-full p-0">
                            <CardContent className="relative w-full h-full">
                                <Image src={image} alt={`Image ${index + 1}`} fill className="object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h1 className="text-white text-2xl font-bold text-shadow-lg">{image.split("/")[1].split(".")[0]}</h1>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
