"use client";

import React, { useState } from 'react';
import { Mail, Linkedin, Facebook, Send, MapPin, Phone, MessageSquare, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { name, email, subject, message } = formData;

        if (!name || !email || !message) {
            toast.error("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        // Construct professional mailto link
        const mailtoLink = `mailto:kareemmedhat03@gmail.com?subject=${encodeURIComponent(subject || 'Message from EduPlatform Student')}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;

        // Trigger email client
        window.location.href = mailtoLink;

        toast.success("Success! Opening your email client...");

        // Reset form after a short delay
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-neutral-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight mb-6">
                        Let's <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">Connect</span>
                    </h1>
                    <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                        Have a question about a course or want to collaborate? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your learning journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <ContactCard
                            icon={<Mail className="w-6 h-6" />}
                            title="Email"
                            value="kareemmedhat03"
                            href="mailto:kareemmedhat03@gmail.com"
                            color="bg-indigo-50 text-indigo-600"
                        />
                        <ContactCard
                            icon={<Linkedin className="w-6 h-6" />}
                            title="LinkedIn"
                            value="Karim Medhat"
                            href="https://www.linkedin.com/in/karim-medhat-60330b382"
                            color="bg-blue-50 text-blue-600"
                        />
                        <ContactCard
                            icon={<Facebook className="w-6 h-6" />}
                            title="Facebook"
                            value="كريم مدحت"
                            href="https://facebook.com/kareem.medhat"
                            color="bg-sky-50 text-sky-600"
                        />

                        <div className="p-8 bg-neutral-900 rounded-[2.5rem] text-white overflow-hidden relative group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Student Support</h3>
                                <p className="text-neutral-400 text-sm mb-6">Need technical help with your account or course access?</p>
                                <Link href="#" className="inline-flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-widest hover:text-indigo-300 transition-colors">
                                    Visit Help Center <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-600/40 transition-colors duration-500" />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-neutral-200/50 border border-neutral-100">
                            <h2 className="text-2xl font-black text-neutral-900 mb-8 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-indigo-600" />
                                Send a Message
                            </h2>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-indigo-600 transition-colors font-bold text-neutral-900 shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-indigo-600 transition-colors font-bold text-neutral-900 shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="How can I help you?"
                                        className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-indigo-600 transition-colors font-bold text-neutral-900 shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">Message</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell me more about your request..."
                                        className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-indigo-600 transition-colors font-bold text-neutral-900 resize-none shadow-sm"
                                    ></textarea>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ContactCard({ icon, title, value, href, color }: { icon: React.ReactNode, title: string, value: string, href: string, color: string }) {
    return (
        <Link href={href} target="_blank" className="block group">
            <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-500 flex items-center gap-5">
                <div className={`${color} p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">{title}</h3>
                    <p className="text-lg font-black text-neutral-900 group-hover:text-indigo-600 transition-colors">{value}</p>
                </div>
            </div>
        </Link>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}
