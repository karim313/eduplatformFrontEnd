'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowLeft, School, Eye, LogIn, Github, Mail, Lock, Loader2 } from 'lucide-react'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required."),
    role: z.enum(["student", "instructor"]),
})

type FormData = z.infer<typeof formSchema>

import { useToken } from '@/app/_Context/tokenContext';
import { signIn } from 'next-auth/react'

export default function Signin() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col font-sans relative overflow-hidden">
            {/* Subtle Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#137fec 0.5px, transparent 0.5px)`,
                    backgroundSize: '20px 20px'
                }}
            />
            <React.Suspense fallback={<div className="flex items-center justify-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
                <SigninContent />
            </React.Suspense>
        </div>
    )
}

function SigninContent() {
    const searchParams = useSearchParams();
    const { setToken } = useToken();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle error params from NextAuth
    React.useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            toast.error(error);
        }
    }, [searchParams]);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "student",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        const session = await signIn("credentials", {
            email: data.email,
            password: data.password,
            role: data.role,
            callbackUrl: "/",
            redirect: true
        });
        setIsLoading(false);
    };


    return <>
        {/* Top App Bar */}
        <div className="relative z-10 flex items-center bg-transparent p-4 justify-between max-w-7xl mx-auto w-full pt-28">
            <Link href="/" className="text-neutral-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-neutral-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
                Student Portal
            </h2>
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 relative z-10">
            <div className="w-full max-w-[440px]">

                {/* Tab Selector */}
                <div className="flex bg-neutral-200 dark:bg-neutral-800 p-1 rounded-2xl mb-8">
                    <Link
                        href="/signin"
                        className="flex-1 py-3 text-center text-sm font-bold rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm transition-all"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/register"
                        className="flex-1 py-3 text-center text-sm font-bold rounded-xl text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-all"
                    >
                        Register
                    </Link>
                </div>

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary text-white p-4 rounded-2xl mb-6 shadow-xl shadow-primary/20">
                        <School className="w-8 h-8" />
                    </div>
                    <h1 className="text-neutral-900 dark:text-white tracking-tight text-3xl font-black leading-tight text-center">
                        Welcome Back
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 text-base font-medium pt-2 text-center">
                        Log in to access your courses and community
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white dark:bg-neutral-900 rounded-[2rem] shadow-2xl shadow-neutral-200 dark:shadow-none border border-neutral-200 dark:border-neutral-800 p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

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
                                                    className="h-14 pl-12 pr-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:ring-primary/20 focus:border-primary transition-all placeholder:text-neutral-400"
                                                />
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
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
                                        <div className="flex justify-between items-center pr-1">
                                            <FormLabel className="text-neutral-900 dark:text-neutral-200 text-sm font-bold pl-1">
                                                Password
                                            </FormLabel>
                                            <Link href="#" className="text-primary text-[11px] font-black hover:underline uppercase tracking-wider">
                                                Forgot?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <div className="relative group">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="h-14 pl-12 pr-12 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:ring-primary/20 focus:border-primary transition-all placeholder:text-neutral-400"
                                                />
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs font-bold pl-1" />
                                    </FormItem>
                                )}
                            />

                            {/* Role Field (Simplified as a toggle/checkbox based on original design but using FormField) */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-2">
                                        <FormControl>
                                            <label className="relative flex items-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={field.value === "instructor"}
                                                    onChange={(e) => field.onChange(e.target.checked ? "instructor" : "student")}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-6 h-6 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center shadow-sm">
                                                    <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="ml-3 text-sm font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                                                    Login as Instructor
                                                </span>
                                            </label>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-4 overflow-hidden"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span className="relative z-10">Sign In</span>
                                        <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Social Login Divider */}
                <div className="flex items-center my-10 px-4">
                    <div className="grow h-px bg-neutral-200 dark:bg-neutral-800"></div>
                    <span className="px-4 text-[10px] text-neutral-400 font-black uppercase tracking-widest bg-neutral-50/50 dark:bg-neutral-950/50 py-1 rounded-full">Or continue with</span>
                    <div className="grow h-px bg-neutral-200 dark:bg-neutral-800"></div>
                </div>

                {/* Social Login Options */}
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-14 rounded-xl font-bold bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        <span>Google</span>
                    </Button>
                    <Button variant="outline" className="h-14 rounded-xl font-bold bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all">
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                    </Button>
                </div>

                {/* Footer Link */}
                <div className="mt-12 text-center">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                        Don&apos;t have an account?
                        <Link href="/register" className="text-primary font-black ml-2 hover:underline transition-all">
                            Sign up instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
}

