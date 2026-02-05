"use client";

import React, { useState } from 'react';
import { X, Smartphone, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { enrollVodafone } from '@/app/_helper/enroll';
import { useToken } from '@/app/_Context/tokenContext';
import { useRouter } from 'next/navigation';
import { EnrollDialogProps } from '@/app/_interface/enrollI';
import { toast } from 'sonner';



export default function EnrollDialog({ courseId, courseTitle, price, isOpen, onClose }: EnrollDialogProps) {
    const { token } = useToken();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState<'stripe' | 'vodafone' | null>(null);
    const [transactionId, setTransactionId] = useState('');

    if (!isOpen) return null;

    const handleVodafoneEnroll = async (txId?: string) => {
        // If no txId, just show the instruction UI without calling the API
        if (!txId) {
            setMethod('vodafone');
            return;
        }

        if (!token) {
            router.push('/signin');
            return;
        }

        setIsLoading(true);
        try {
            const result = await enrollVodafone(courseId, token, txId);
            // Check for success or already enrolled
            if (result.success || result.message?.toLowerCase().includes('success')) {
                toast.success('Your transaction is being verified.');
                onClose();
            } else if (
                result.message?.toLowerCase().includes('already enrolled') ||
                result.message?.includes('duplicate key') ||
                result.message?.includes('E11000')
            ) {
                toast.info('You are already enrolled in this course!');
                onClose();
            } else {
                toast.error(result.message || result.error || 'Enrollment failed. Please contact support.');
            }
        } catch (error: any) {
            console.error('Vodafone error:', error);
            toast.error(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-neutral-100 flex flex-col max-h-[90vh]">
                {/* Fixed Header */}
                <div className="p-8 pb-4 flex items-center justify-between bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Enroll Now</h2>
                        <p className="text-neutral-500 text-sm font-medium mt-1">Select your preferred payment method</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-neutral-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Center Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-4">
                    {/* Course Info Summary */}
                    <div className="p-4 bg-neutral-50 rounded-2xl flex items-center justify-between border border-neutral-100 mb-6">
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Course</span>
                            <span className="text-sm font-bold text-neutral-800 line-clamp-1">{courseTitle}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Price</span>
                            <div className="text-lg font-black text-indigo-600">${price}</div>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        {/* Vodafone Cash Option */}
                        <button
                            onClick={() => handleVodafoneEnroll()}
                            disabled={isLoading}
                            className={`w-full group relative flex items-center gap-4 p-5 rounded-3xl border-2 transition-all text-left ${method === 'vodafone' ? 'border-red-600 bg-red-50/30' : 'border-neutral-100 hover:border-red-600 hover:bg-red-50/30'}`}
                        >
                            <div className={`p-3 rounded-2xl transition-colors ${method === 'vodafone' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'}`}>
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-neutral-900">Vodafone Cash</h3>
                                <p className="text-xs font-medium text-neutral-500">Fast and easy mobile wallet</p>
                            </div>
                            <ArrowRight className={`w-5 h-5 transition-transform ${method === 'vodafone' ? 'text-red-600' : 'text-neutral-300 group-hover:text-red-600 group-hover:translate-x-1'}`} />
                        </button>

                        {/* Optional Vodafone Cash Detailed View */}
                        {method === 'vodafone' && (
                            <div className="mt-4 p-6 bg-red-50 rounded-3xl border border-red-100 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="bg-red-600 text-white p-2 rounded-xl">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-black text-red-900 leading-tight">Vodafone Cash Transfer</h4>
                                        <p className="text-xs font-bold text-red-700 mt-1">Please transfer the amount to the number below:</p>
                                    </div>
                                </div>
                                <div className="bg-white/50 p-4 rounded-xl border border-red-200 text-center mb-4">
                                    <span className="text-2xl font-black text-red-600 tracking-wider">01012345678</span>
                                </div>
                                <div className="text-[10px] text-red-800 space-y-2 mb-4 font-bold text-left">
                                    <p>1. Send exactly ${price} (equivalent in EGP) to the number.</p>
                                    <p>2. Keep your transaction ID/Screenshot for verification.</p>
                                    <p>3. Your enrollment will be active after admin verification.</p>
                                </div>
                                <div className="space-y-4 mb-4">
                                    <div className="space-y-2 text-left">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-red-900 ml-1">Transaction ID</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. TXN123456789"
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            className="w-full bg-white border-2 border-red-100 rounded-2xl px-4 py-3 text-sm font-bold text-red-900 outline-none focus:border-red-600 transition-colors placeholder:text-red-200"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleVodafoneEnroll(transactionId)}
                                        disabled={isLoading || !transactionId}
                                        className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                        Confirm Payment Sent
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Footer Security */}
                <div className="p-6 bg-white flex items-center justify-center gap-2 border-t border-neutral-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Secure 256-bit encrypted checkout</span>
                </div>
            </div>
        </div>
    );
}
