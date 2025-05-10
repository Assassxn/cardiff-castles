"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
}

interface Props {
    castleId: string;
    initialReviews: Review[];
}

// Define the exact union type for sorting:
type SortKey = "newest" | "oldest" | "rating";

export default function ReviewsSection({ castleId, initialReviews }: Props) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [sortKey, setSortKey] = useState<SortKey>("newest");
    const [open, setOpen] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newText, setNewText] = useState("");

    useEffect(() => {
        const raw = localStorage.getItem(`reviews-${castleId}`);
        const stored: Review[] = raw ? JSON.parse(raw) : [];
        setReviews([...stored, ...initialReviews]);
    }, [castleId, initialReviews]);

    useEffect(() => {
        localStorage.setItem(`reviews-${castleId}`, JSON.stringify(reviews));
    }, [castleId, reviews]);

    const sorted = useMemo(() => {
        const arr = [...reviews];
        if (sortKey === "newest") {
            return arr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        }
        if (sortKey === "oldest") {
            return arr.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        }
        return arr.sort((a, b) => b.rating - a.rating);
    }, [reviews, sortKey]);

    const handleSubmit = () => {
        if (newRating < 1 || !newText.trim()) return;
        const review: Review = {
            id: Date.now().toString(),
            author: "Anonymous",
            rating: newRating,
            date: new Date().toISOString(),
            text: newText.trim(),
        };
        setReviews((r) => [review, ...r]);
        setNewRating(0);
        setNewText("");
        setOpen(false);
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Reviews</h2>
                <div className="flex items-center space-x-2">
                    <Select
                        value={sortKey}
                        // value comes in as our SortKey union—no `any` needed
                        onValueChange={(value: SortKey) => setSortKey(value)}
                    >
                        <SelectTrigger size="sm">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                    </Select>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                                +
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add a Review</DialogTitle>
                            </DialogHeader>

                            <div className="flex space-x-1 mb-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={24} className={`${i <= newRating ? "text-yellow-500 fill-current" : "text-gray-300"} cursor-pointer`} onClick={() => setNewRating(i)} />
                                ))}
                            </div>

                            <Textarea placeholder="Your thoughts…" rows={4} value={newText} onChange={(e) => setNewText(e.currentTarget.value)} />
                            <DialogFooter>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((r) => (
                    <Card key={r.id} className="h-full">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">{r.author}</CardTitle>
                            <p className="text-sm text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>⭐ {r.rating} / 5</div>
                            <p className="text-sm">{r.text}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
