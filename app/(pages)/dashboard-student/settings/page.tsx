'use client'

import React from 'react'
import {
    User,
    Mail,
    UserCircle,
    LogOut,
    ShieldCheck
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
    const router = useRouter();

    const handleSignOut = () => {
        // Add logout logic here (clear tokens, etc.)
        router.push('/signin');
    }

    return (
        <main className="min-h-screen pt-32 pb-20 bg-neutral-50/50">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-2">My Account</h1>
                    <p className="text-neutral-500 font-medium">View your profile details and manage your session.</p>
                </div>

                <div className="space-y-6">
                    {/* Profile Information (Read-Only) */}
                    <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/40 overflow-hidden">
                        <div className="p-8 border-b border-neutral-50 bg-neutral-50/30 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-neutral-900">Personal Details</h3>
                                <p className="text-sm text-neutral-500 font-medium mt-1">Information connected to your account.</p>
                            </div>
                            <div className="px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Verified Profile</span>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Avatar Display */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-[2rem] bg-indigo-50 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                                    <UserCircle className="w-20 h-20 text-indigo-200" />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xl font-black text-neutral-900">Karim Medhat</h4>
                                    <p className="text-sm text-neutral-500 font-medium tracking-tight">Student ID: #882941</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">Full Name</Label>
                                    <div className="h-14 flex items-center px-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-900 font-bold text-base">
                                        Karim Medhat
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">Username</Label>
                                    <div className="h-14 flex items-center px-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-900 font-bold text-base">
                                        karim313
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">Email Address</Label>
                                    <div className="h-14 flex items-center px-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-900 font-bold text-base gap-3">
                                        <Mail className="w-5 h-5 text-neutral-300" />
                                        karim@example.com
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Session Management */}
                    <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-lg shadow-neutral-200/30 p-8 flex flex-col items-center gap-6">
                        <div className="text-center space-y-1">
                            <h4 className="text-lg font-black text-neutral-900">Session Security</h4>
                            <p className="text-sm text-neutral-500 font-medium">End your current session to log out of the platform.</p>
                        </div>

                        <Button
                            onClick={handleSignOut}
                            className="w-full h-16 rounded-[1.25rem] bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white hover:shadow-xl hover:shadow-red-200 transition-all duration-300 font-black text-lg flex items-center justify-center gap-3 group"
                        >
                            <LogOut className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                            Sign Out Account
                        </Button>

                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                            Secure Logout • Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
