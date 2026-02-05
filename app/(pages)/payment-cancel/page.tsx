"use client";

import React from 'react';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancel() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-neutral-50 flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-2xl shadow-neutral-200/50 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-8 mx-auto">
                    <XCircle className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">Payment Cancelled</h1>
                <p className="text-neutral-500 font-medium mb-10">
                    Your payment was not completed, and you haven't been charged. Feel free to try again when you're ready.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/courses"
                        className="flex items-center justify-center gap-2 w-full bg-neutral-900 text-white py-4 rounded-2xl font-black hover:bg-neutral-800 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Courses
                    </Link>

                    <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 w-full bg-white text-neutral-600 py-4 rounded-2xl font-bold text-sm hover:text-neutral-900 transition-colors"
                    >
                        <HelpCircle className="w-4 h-4" />
                        Need help with payment?
                    </Link>
                </div>
            </div>
        </main>
    );
}
