"use client";

import React, { useState, useEffect } from 'react';
import {
    Star,
    Clock,
    PlayCircle,
    Users,
    Globe,
    Calendar,
    Award,
    CheckCircle2,
    ChevronDown,
    Play,
    Lock,
    Download,
    Share2,
    Heart,
    Layout,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useToken } from '@/app/_Context/tokenContext';
import { CourseidI } from '@/app/_interface/courseidI';
import EnrollDialog from '@/components/ui/EnrollDialog';

export default function CourseDetail() {
    const { courseid } = useParams();
    const router = useRouter();
    const { token } = useToken();
    const [activeTab, setActiveTab] = useState('curriculum');
    const [expandedSections, setExpandedSections] = useState<string[]>(['1']);
    const [course, setCourse] = useState<CourseidI | null>(null);
    const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(false);

    // Find the course based on the ID in the URL
    console.log(courseid);

    if (!courseid) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-50">
                <h2 className="text-2xl font-black text-neutral-900 mb-4">Course not found</h2>
                <Link href="/courses" className="text-indigo-600 font-bold flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Courses
                </Link>
            </div>
        );
    }
    async function getSpecificCourse() {
        try {
            const response = await fetch('https://educational-platform-api2-production-2097.up.railway.app/api/courses/' + courseid, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setCourse(data.data);
            }
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    }

    async function checkEnrollment() {
        if (!token || !courseid) return;
        setIsCheckingEnrollment(true);
        try {
            const response = await fetch('https://educational-platform-api2-production-2097.up.railway.app/api/enrollments/my-courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                cache: 'no-store'
            });
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                const enrolled = data.data.some((c: any) => c && c._id === courseid);
                setIsEnrolled(enrolled);
            }
        } catch (error) {
            console.error("Error checking enrollment:", error);
        } finally {
            setIsCheckingEnrollment(false);
        }
    }

    useEffect(() => {
        getSpecificCourse();
    }, [courseid]);

    useEffect(() => {
        if (token) {
            checkEnrollment();
        }
    }, [token, courseid]);





    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-50">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-xl font-bold text-neutral-900">Loading course details...</h2>
            </div>
        );
    }
    // Derived data from the API response
    const playlistLessons = course.playlists?.reduce((acc, p) => acc + (p.videos?.length || 0), 0) || 0;
    const topLevelLessons = course.videos?.length || 0;
    const totalLessons = playlistLessons + topLevelLessons;

    const playlistSeconds = course.playlists?.reduce((acc, p) =>
        acc + (p.videos?.reduce((vacc, v) => vacc + (v.duration || 0), 0) || 0), 0
    ) || 0;
    const topLevelSeconds = course.videos?.reduce((acc, v) => acc + (v.duration || 0), 0) || 0;
    const totalSeconds = (playlistSeconds + topLevelSeconds) * 60; // Assuming duration is in minutes

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <main className="min-h-screen bg-background pt-20 font-sans">
            {/* Dark Hero Section */}
            <div className="bg-neutral-900 text-white pt-12 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs text-neutral-400 mb-4 md:mb-6 font-black uppercase tracking-widest">
                            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
                            <span>/</span>
                            <span className="text-primary">{course.category || 'Technology'}</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight tracking-tight">
                            {course.title}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-neutral-300 mb-6 md:mb-8 max-w-3xl leading-relaxed">
                            {course.description || `Master the skills of ${course.title} with this comprehensive course.`}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center text-yellow-500 bg-yellow-400/10 px-2 py-1 rounded-lg">
                                    <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500" />
                                    <span className="ml-1.5 font-black text-sm md:text-base">{course.rating || 4.5}</span>
                                </div>
                                <span className="text-neutral-400 text-xs md:text-sm font-bold underline decoration-neutral-700">({(course.reviews || 0).toLocaleString()} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-300 text-xs md:text-sm">
                                <Users className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="font-bold">Enrolled Students</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 md:gap-8 text-[10px] md:text-xs text-neutral-400 font-black uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-500" />
                                <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-500" />
                                <span>English</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                                <span className="text-primary">Professional Certificate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content & Sticky Sidebar */}
            <div className="max-w-7xl mx-auto px-6 -mt-12 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-12 order-2 lg:order-1">

                        {/* Learning Outcomes Card (Generic fallback for now) */}
                        <div className="bg-card rounded-3xl p-8 border border-border shadow-xl shadow-border/50">
                            <h2 className="text-2xl font-black mb-6 text-foreground">What you'll learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                {[
                                    "Practical hands-on projects",
                                    "Industry standard best practices",
                                    `${course.level} level certification preparation`,
                                    "Complete walkthrough of all tools",
                                    "Advanced techniques and workflows"
                                ].map((outcome, idx) => (
                                    <div key={idx} className="flex items-start gap-3 group">
                                        <div className="mt-1 p-0.5 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-colors">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-neutral-600 font-bold text-sm leading-snug">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="border-b border-border sticky top-[72px] lg:top-20 bg-background/95 backdrop-blur-md z-30 flex gap-4 md:gap-8 overflow-x-auto no-scrollbar">
                            {['Curriculum', 'About', 'Instructor'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`py-4 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab.toLowerCase()
                                        ? 'text-foreground border-b-4 border-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content: Curriculum */}
                        {activeTab === 'curriculum' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-black text-foreground">Course Content</h2>
                                    <span className="text-muted-foreground font-bold text-sm bg-secondary px-3 py-1 rounded-full">{totalLessons} Lectures • {totalHours}h {totalMinutes}m Total</span>
                                </div>

                                {course.playlists.map((playlist, pIdx) => (
                                    <div key={playlist._id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                                        <div
                                            className="px-6 py-5 bg-secondary/50 flex items-center justify-between border-b border-border cursor-pointer hover:bg-secondary transition-colors"
                                            onClick={() => toggleSection(playlist._id)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Layout className={`w-5 h-5 ${expandedSections.includes(playlist._id) ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <span className="font-bold text-foreground">{playlist.title}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{playlist.videos.length} Videos</span>
                                                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.includes(playlist._id) ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>

                                        {expandedSections.includes(playlist._id) && (
                                            <div className="divide-y divide-border px-2 md:px-4">
                                                {playlist.videos.map((video, vIdx) => (
                                                    <div key={video._id} className="px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-secondary/50 transition-colors cursor-pointer gap-2">
                                                        <div className="flex items-center gap-4 min-w-0">
                                                            <div className="shrink-0">
                                                                <PlayCircle className="w-4 h-4 text-primary" />
                                                            </div>
                                                            <span className="text-sm font-bold text-foreground leading-tight">
                                                                {vIdx + 1}. {video.title}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:pl-0 pl-8">
                                                            <span className="text-[10px] md:text-xs text-neutral-400 font-bold uppercase tracking-wider">
                                                                {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                                            </span>
                                                            <Play className="w-3 h-3 text-neutral-300 group-hover:text-indigo-600 transition-colors" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Top-level videos (General Lessons) */}
                                {course.videos && course.videos.length > 0 && (
                                    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                                        <div
                                            className="px-6 py-5 bg-secondary/50 flex items-center justify-between border-b border-border cursor-pointer hover:bg-secondary transition-colors"
                                            onClick={() => toggleSection('general-videos')}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Layout className={`w-5 h-5 ${expandedSections.includes('general-videos') ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <span className="font-bold text-foreground">General Lessons</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{course.videos.length} Videos</span>
                                                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.includes('general-videos') ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>

                                        {expandedSections.includes('general-videos') && (
                                            <div className="divide-y divide-border px-4">
                                                {course.videos.map((video, vIdx) => (
                                                    <div key={video._id} className="px-6 py-4 flex items-center justify-between group hover:bg-secondary/50 transition-colors cursor-pointer">
                                                        <div className="flex items-center gap-4">
                                                            <PlayCircle className="w-4 h-4 text-primary" />
                                                            <span className="text-sm font-bold text-foreground">
                                                                {vIdx + 1}. {video.title}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xs text-neutral-400 font-bold">
                                                                {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                                            </span>
                                                            <Play className="w-3 h-3 text-neutral-300 group-hover:text-indigo-600 transition-colors" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* About Content */}
                        {activeTab === 'about' && (
                            <div className="bg-card rounded-3xl p-10 border border-border shadow-sm leading-relaxed text-muted-foreground">
                                <h2 className="text-3xl font-black mb-8 text-foreground tracking-tight">Become an Expert in {course.category || 'Technology'}</h2>
                                <p className="text-lg font-medium mb-6">
                                    {course.description}
                                </p>
                                <div className="bg-secondary p-6 rounded-2xl border-l-4 border-primary italic text-foreground font-bold">
                                    "Join thousands of students and transform your career today with this industry-recognized certification."
                                </div>
                            </div>
                        )}

                        {/* Instructor Content */}
                        {activeTab === 'instructor' && (
                            <div className="bg-card rounded-3xl p-10 border border-border shadow-sm flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center shrink-0 border-4 border-background shadow-lg overflow-hidden relative">
                                    <Image src={course.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} alt={course.instructor || 'Instructor'} fill className="object-cover" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-foreground">{course.instructor || 'Dr. Alex Rivera'}</h3>
                                    <p className="text-sm font-black text-primary uppercase tracking-widest">Lead Instructor • Expert in {course.category || 'Tech'}</p>
                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                        An expert in the field with years of industry experience and a passion for teaching thousands of students worldwide.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-1 order-1 lg:order-2 mb-8 lg:mb-0">
                        <div className="lg:sticky lg:top-28 bg-card rounded-[2.5rem] shadow-2xl shadow-border/50 border border-border overflow-hidden group">
                            {/* Preview Image */}
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={course.image || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'}
                                    alt={course.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-neutral-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                        <Play className="w-6 h-6 text-white fill-white" />
                                    </div>
                                </div>
                                {course.tag && (
                                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        {course.tag}
                                    </div>
                                )}
                            </div>

                            {/* Price & Primary CTA */}
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="text-4xl font-black text-foreground tracking-tighter">${course.price}</span>
                                    <span className="text-red-600 text-[10px] font-black uppercase tracking-wider bg-red-500/10 px-2 py-1 rounded-md">One-time payment</span>
                                </div>

                                <div className="space-y-4">
                                    {isEnrolled ? (
                                        <Link
                                            href={`/courses/${course._id}/player`}
                                            className="w-full flex items-center justify-center bg-emerald-600 text-white h-16 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-xl shadow-emerald-200"
                                        >
                                            <PlayCircle className="w-5 h-5 mr-2" />
                                            Open Course Player
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => setIsEnrollDialogOpen(true)}
                                            disabled={isCheckingEnrollment}
                                            className="w-full bg-foreground text-background h-16 rounded-2xl font-black text-lg hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-xl shadow-neutral-200 flex items-center justify-center gap-2"
                                        >
                                            {isCheckingEnrollment ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                'Enroll Now'
                                            )}
                                        </button>
                                    )}
                                    {!isEnrolled && (
                                        <button className="w-full bg-background text-foreground border-2 border-border h-16 rounded-2xl font-black text-lg hover:bg-secondary transition-all">
                                            Add to Cart
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-6 pt-8 mt-8 border-t border-border">
                                    <h4 className="font-black text-foreground uppercase tracking-widest text-xs">Course Features:</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { icon: Clock, text: `${totalHours}h ${totalMinutes}m on-demand content` },
                                            { icon: Layout, text: `${totalLessons} Lectures & Quizzes` },
                                            { icon: Award, text: "Certificate of completion" },
                                            { icon: Download, text: "Downloadable resources" },
                                            { icon: PlayCircle, text: "Lifetime access" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-neutral-600">
                                                <item.icon className="w-4 h-4 text-indigo-600" />
                                                <span className="text-xs font-bold">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-8 mt-10">
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-indigo-600 transition-colors">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                    <div className="w-px h-4 bg-neutral-200" />
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-colors">
                                        <Heart className="w-4 h-4" /> Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EnrollDialog
                isOpen={isEnrollDialogOpen}
                onClose={() => setIsEnrollDialogOpen(false)}
                courseId={course._id}
                courseTitle={course.title}
                price={course.price}
            />
        </main>
    );
}