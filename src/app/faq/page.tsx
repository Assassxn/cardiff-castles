import Navbar from "@/components/shared/Navbar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import data from "../../../public/data/defaultFAQ.json";

export default function FAQ() {
    return (
        <>
            <Navbar />
            <div className="p-10 max-w-[60vw] mx-auto">
                <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
                <p className="text-muted-foreground mb-6">Find answers to the most common questions below</p>

                <Accordion type="single" collapsible className="space-y-4">
                    {data.map((faq: { question: string; answer: string }, index: number) => (
                        <Card key={index} className="w-full h-full cursor-pointer hover:shadow-lg transition-shadow duration-200">
                            <CardContent>
                                <AccordionItem value={`q${index}`} >
                                    <AccordionTrigger className="cursor-pointer text-lg font-medium">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="cursor-pointer text-m text-muted-foreground pt-2">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            </CardContent>
                        </Card>
                    ))}
                </Accordion>
            </div>
        </>
    );
}
