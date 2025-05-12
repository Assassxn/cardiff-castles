"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";

interface User {
    name: string;
    email: string;
    password: string;
}

type TabValue = "signin" | "signup" | "profile";

export default function AccountPage() {
    // using state to manage users and session
    // this is a simple example, in a real app you would use a backend service
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [tab, setTab] = useState<TabValue>(currentUser ? "profile" : "signin");

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    useEffect(() => {
        // load users and session
        const stored = localStorage.getItem("users");
        // if users are not found in local storage, initialize with an empty array
        const sessionEmail = localStorage.getItem("session");

        // if session is found, set the current user
        if (stored) setUsers(JSON.parse(stored));
        // if session is found, set the current user
        if (sessionEmail && stored) {
            const all: User[] = JSON.parse(stored);
            const u = all.find((u) => u.email === sessionEmail);
            if (u) {
                setCurrentUser(u);
                setTab("profile");
            }
        }
    }, []);

    useEffect(() => {
        // persist users
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            // check if passwords match
            toast.error("Passwords do not match");
            return;
        }
        if (users.some((u) => u.email === email)) {
            // check if email is already registered
            toast.error("Email already registered");
            return;
        }
        const newUser: User = { name, email, password };
        setUsers([...users, newUser]);
        // set the current user and store in local storage
        localStorage.setItem("session", email);
        // set the current user to the new user
        setCurrentUser(newUser);
        // show success message
        toast.success("Account created!");
        // reset form
        setName("");
        setEmail("");
        setPassword("");
        setConfirm("");
        setTab("profile");
    };

    const handleSignin = (e: React.FormEvent) => {
        e.preventDefault();
        // check if email and password are correct
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
            // if not, show error message
            toast.error("Invalid credentials");
            return;
        }
        // if yes, set the current user and store in local storage
        localStorage.setItem("session", email);
        // set the current user to the found user
        setCurrentUser(user);
        // show success message
        toast.success("Signed in!");
        // reset
        setEmail("");
        setPassword("");
        setTab("profile");
    };

    // handle sign out
    const handleSignOut = () => {
        // remove session from local storage
        localStorage.removeItem("session");
        setCurrentUser(null);
        setTab("signin");
        toast("Signed out");
    };

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto my-10">
                <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)} className="w-full">
                    <TabsList className="justify-center">
                        {!currentUser && <TabsTrigger value="signin">Sign In</TabsTrigger>}
                        {!currentUser && <TabsTrigger value="signup">Sign Up</TabsTrigger>}
                        {currentUser && <TabsTrigger value="profile">Profile</TabsTrigger>}
                    </TabsList>

                    {/* Sign In */}
                    <TabsContent value="signin">
                        <Card>
                            <CardTitle className="text-center">Welcome Back</CardTitle>
                            <CardDescription className="text-center">Sign in to your account</CardDescription>
                            <CardContent>
                                <form className="space-y-4" onSubmit={handleSignin}>
                                    <div>
                                        <Label htmlFor="signin-email">Email</Label>
                                        <Input id="signin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="signin-password">Password</Label>
                                        <Input id="signin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Sign In
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Sign Up */}
                    <TabsContent value="signup">
                        <Card>
                            <CardTitle className="text-center">Create Account</CardTitle>
                            <CardDescription className="text-center">Register for a new account</CardDescription>
                            <CardContent>
                                <form className="space-y-4" onSubmit={handleSignup}>
                                    <div>
                                        <Label htmlFor="signup-name">Name</Label>
                                        <Input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="signup-email">Email</Label>
                                        <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="signup-password">Password</Label>
                                        <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                                        <Input id="signup-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Sign Up
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Profile */}
                    <TabsContent value="profile">
                        <Card>
                            <CardTitle className="text-center">Your Profile</CardTitle>
                            <CardDescription className="text-center">Manage your account</CardDescription>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <span className="font-medium">Name:</span> {currentUser?.name}
                                </div>
                                <div className="text-center">
                                    <span className="font-medium">Email:</span> {currentUser?.email}
                                </div>
                                <Button className="w-full" onClick={handleSignOut}>
                                    Sign Out
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
