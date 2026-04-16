'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowLeft, School, Eye, UserPlus, Github, User, Loader2, Mail, Lock } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    role: z.enum(["student", "instructor"]),
})

type FormData = z.infer<typeof formSchema>

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "student",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://educational-platform-api2-production-2097.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Account created successfully!");
                console.log(result);
                router.push('/signin');
            } else {
                toast.error(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please check your connection.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans relative overflow-hidden">
            {/* Subtle Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#137fec 0.5px, transparent 0.5px)`,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Top App Bar */}
            <div className="relative z-10 flex items-center bg-transparent p-4 justify-between max-w-7xl mx-auto w-full pt-28">
                <Link href="/" className="text-foreground flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h2 className="text-foreground text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
                    Student Portal
                </h2>
            </div>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 relative z-10">
                <div className="w-full max-w-[440px]">

                    {/* Tab Selector */}
                    <div className="flex bg-secondary p-1 rounded-2xl mb-8">
                        <Link
                            href="/signin"
                            className="flex-1 py-3 text-center text-sm font-bold rounded-xl text-muted-foreground hover:text-foreground transition-all"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="flex-1 py-3 text-center text-sm font-bold rounded-xl bg-background text-foreground shadow-sm transition-all"
                        >
                            Register
                        </Link>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-primary text-primary-foreground p-4 rounded-2xl mb-6 shadow-xl shadow-primary/20">
                            <School className="w-8 h-8" />
                        </div>
                        <h1 className="text-foreground tracking-tight text-3xl font-black leading-tight text-center">
                            Create Account
                        </h1>
                        <p className="text-muted-foreground text-base font-medium pt-2 text-center">
                            Join our community of students and start learning today
                        </p>
                    </div>

                    {/* Registration Form Card */}
                    <div className="bg-card rounded-[2rem] shadow-2xl shadow-border/50 border border-border p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-neutral-900 dark:text-neutral-200 text-sm font-bold pl-1">
                                                Full Name
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                                                    />
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs font-bold pl-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-neutral-900 dark:text-neutral-200 text-sm font-bold pl-1">
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Input
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        {...field}
                                                        className="h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                                                    />
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs font-bold pl-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-neutral-900 dark:text-neutral-200 text-sm font-bold pl-1">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        {...field}
                                                        className="h-14 pl-12 pr-12 rounded-xl bg-secondary/50 border border-border text-foreground focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                                                    />
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs font-bold pl-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Role Field */}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-neutral-900 dark:text-neutral-200 text-sm font-bold pl-1">
                                                Join as
                                            </FormLabel>
                                            <FormControl>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <label className={cn(
                                                        "relative flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                                                        field.value === "student"
                                                            ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                                                            : "border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30"
                                                    )}>
                                                        <input
                                                            type="radio"
                                                            className="sr-only"
                                                            {...field}
                                                            value="student"
                                                            checked={field.value === "student"}
                                                            onChange={() => field.onChange("student")}
                                                        />
                                                        <span className={cn(
                                                            "text-sm font-bold transition-colors",
                                                            field.value === "student" ? "text-primary" : "text-neutral-500 dark:text-neutral-400"
                                                        )}>Student</span>
                                                    </label>
                                                    <label className={cn(
                                                        "relative flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                                                        field.value === "instructor"
                                                            ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                                                            : "border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30"
                                                    )}>
                                                        <input
                                                            type="radio"
                                                            className="sr-only"
                                                            {...field}
                                                            value="instructor"
                                                            checked={field.value === "instructor"}
                                                            onChange={() => field.onChange("instructor")}
                                                        />
                                                        <span className={cn(
                                                            "text-sm font-bold transition-colors",
                                                            field.value === "instructor" ? "text-primary" : "text-neutral-500 dark:text-neutral-400"
                                                        )}>Instructor</span>
                                                    </label>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs font-bold pl-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Register Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-4 overflow-hidden"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <span className="relative z-10">Create Account</span>
                                            <UserPlus className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>

                    {/* Social Login Divider */}
                    <div className="flex items-center my-10 px-4">
                        <div className="grow h-px bg-border"></div>
                        <span className="px-4 text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-background/50 py-1 rounded-full">Or sign up with</span>
                        <div className="grow h-px bg-border"></div>
                    </div>

                    {/* Social Register Options */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-14 rounded-xl font-bold bg-background border-border hover:shadow-md transition-all">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            <span>Google</span>
                        </Button>
                        <Button variant="outline" className="h-14 rounded-xl font-bold bg-background border-border hover:shadow-md transition-all">
                            <Github className="w-5 h-5" />
                            <span>GitHub</span>
                        </Button>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-12 text-center">
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                            Already have an account?
                            <Link href="/signin" className="text-primary font-black ml-2 hover:underline transition-all">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
