"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useToken } from '@/app/_Context/tokenContext';
import { toast } from 'sonner';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { token } = useToken();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [courseId, setCourseId] = useState<string | null>(null);

    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        async function verifyPayment() {
            if (!sessionId || !token) {
                if (!sessionId) setStatus('error');
                return;
            }

            try {
                const response = await fetch(`https://educational-platform-api2-production-2097.up.railway.app/api/enrollments/stripe-success?session_id=${sessionId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.success) {
                    setStatus('success');
                    setCourseId(data.data.course);
                    toast.success('Payment verified successfully!');
                } else {
                    setStatus('error');
                    toast.error(data.message || 'Payment verification failed');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
            }
        }

        verifyPayment();
    }, [sessionId, token]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h2 className="text-2xl font-black text-neutral-900">Verifying Payment...</h2>
                <p className="text-neutral-500 font-medium">Please don't close this page.</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-red-600 rotate-180" />
                </div>
                <h2 className="text-3xl font-black text-neutral-900 mb-4">Something went wrong</h2>
                <p className="text-neutral-500 font-medium mb-8 max-w-md">We couldn't verify your payment. If you've been charged, please contact support with your session ID: {sessionId}</p>
                <Link href="/courses" className="bg-neutral-900 text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all">
                    Back to Courses
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-neutral-900 mb-4">Enrollment Successful!</h2>
            <p className="text-neutral-500 font-medium mb-10 max-w-md">Congratulations! You now have full access to the course materials. Your learning journey starts now.</p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href={courseId ? `/courses/${courseId}/player` : '/dashboard-student'}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-200"
                >
                    <PlayCircle className="w-5 h-5" />
                    Start Learning
                </Link>
                <Link
                    href="/dashboard-student"
                    className="flex items-center justify-center gap-2 bg-white text-neutral-900 border-2 border-neutral-100 px-8 py-4 rounded-2xl font-black hover:bg-neutral-50 transition-all"
                >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}

export default function PaymentSuccess() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-neutral-50">
            <div className="max-w-3xl mx-auto">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <h2 className="text-2xl font-black text-neutral-900">Loading...</h2>
                    </div>
                }>
                    <PaymentSuccessContent />
                </Suspense>
            </div>
        </main>
    );
}
