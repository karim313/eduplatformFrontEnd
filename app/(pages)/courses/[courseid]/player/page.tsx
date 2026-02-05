"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    PlayCircle,
    Lock,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    Layout,
    MessageCircle,
    FileText,
    CheckCircle2,
    Play
} from 'lucide-react';
import Link from 'next/link';
import { useToken } from '@/app/_Context/tokenContext';
import { CourseidI } from '@/app/_interface/courseidI';

export default function CoursePlayer() {
    const { courseid } = useParams();
    const { token } = useToken();
    const router = useRouter();

    const [course, setCourse] = useState<CourseidI | null>(null);
    const [activeVideo, setActiveVideo] = useState<{ url: string, title: string, id: string } | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            router.push('/signin');
            return;
        }

        async function fetchCourseData() {
            try {
                // First check enrollment or just fetch course 
                // (Server should ideally handle authorization)
                const response = await fetch(`https://educational-platform-api2-production.up.railway.app/api/courses/${courseid}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await response.json();

                if (result.success) {
                    const courseData = result.data;
                    setCourse(courseData);

                    // Set first video as active by default
                    if (courseData.playlists?.length > 0 && courseData.playlists[0].videos?.length > 0) {
                        const firstVideo = courseData.playlists[0].videos[0];
                        setActiveVideo({
                            url: firstVideo.videoUrl,
                            title: firstVideo.title,
                            id: firstVideo._id
                        });
                        setExpandedSections([courseData.playlists[0]._id]);
                    } else if (courseData.videos?.length > 0) {
                        const firstVideo = courseData.videos[0];
                        setActiveVideo({
                            url: firstVideo.videoUrl,
                            title: firstVideo.title,
                            id: firstVideo._id
                        });
                        setExpandedSections(['general-videos']);
                    }
                } else {
                    // If not enrolled or error, redirect
                    router.push(`/courses/${courseid}`);
                }
            } catch (error) {
                console.error("Player fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourseData();
    }, [courseid, token]);

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Helper to get YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!course || !activeVideo) return null;

    return (
        <div className="bg-neutral-950 text-white flex flex-col lg:flex-row h-[calc(100vh-73px)] overflow-hidden">
            {/* Main Video Area */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto">
                {/* Player Header */}
                <div className="p-4 bg-neutral-900/50 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between">
                    <Link href="/courses" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-bold hidden sm:inline">Back to Courses</span>
                    </Link>
                    <h1 className="text-sm font-black truncate max-w-sm px-4">{course.title}</h1>
                    <div className="w-24" /> {/* Spacer */}
                </div>

                {/* Video Playback Container */}
                <div className="relative aspect-video bg-black shadow-2xl">
                    {getYouTubeId(activeVideo.url) ? (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.url)}?autoplay=1&rel=0`}
                            title={activeVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-500">
                            Video player format not supported
                        </div>
                    )}
                </div>

                {/* Video Info */}
                <div className="p-8 max-w-4xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-neutral-800 pb-8">
                        <div>
                            <span className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 block">Currently Playing</span>
                            <h2 className="text-2xl font-black">{activeVideo.title}</h2>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-6 py-3 bg-neutral-800 rounded-xl font-bold text-sm hover:bg-neutral-700 transition-all">
                                <FileText className="w-4 h-4" /> Resources
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
                                <MessageCircle className="w-4 h-4" /> Discussion
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">About this lesson</h3>
                        <p className="text-neutral-400 leading-relaxed">
                            {course.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sidebar Playlist */}
            <div className="w-full lg:w-[400px] border-l border-neutral-800 bg-neutral-900 flex flex-col h-full">
                <div className="p-6 border-b border-neutral-800 bg-neutral-900/50">
                    <h2 className="text-lg font-black flex items-center gap-3">
                        <Layout className="w-5 h-5 text-indigo-500" />
                        Course Curriculum
                    </h2>
                    <div className="mt-2 text-xs font-bold text-neutral-500 flex items-center gap-3">
                        <span>{(course.playlists?.length || 0) + (course.videos?.length > 0 ? 1 : 0)} Sections</span>
                        <div className="w-1 h-1 bg-neutral-700 rounded-full" />
                        <span>{(course.playlists?.reduce((acc, p) => acc + p.videos.length, 0) || 0) + (course.videos?.length || 0)} Lessons</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
                    {course.playlists.map((playlist, pIdx) => (
                        <div key={playlist._id} className="border-b border-neutral-800/50">
                            <button
                                onClick={() => toggleSection(playlist._id)}
                                className={`w-full px-6 py-5 flex items-center justify-between hover:bg-neutral-800/50 transition-colors ${expandedSections.includes(playlist._id) ? 'bg-neutral-800/30' : ''}`}
                            >
                                <div className="flex items-center gap-3 text-left">
                                    <span className="text-xs font-black text-neutral-600">{String(pIdx + 1).padStart(2, '0')}</span>
                                    <span className="text-sm font-bold">{playlist.title}</span>
                                </div>
                                {expandedSections.includes(playlist._id) ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                            </button>

                            {expandedSections.includes(playlist._id) && (
                                <div className="bg-neutral-950/30">
                                    {playlist.videos.map((video, vIdx) => (
                                        <button
                                            key={video._id}
                                            onClick={() => setActiveVideo({ url: video.videoUrl, title: video.title, id: video._id })}
                                            className={`w-full px-8 py-4 flex items-center gap-4 group hover:bg-neutral-800/50 transition-all border-l-4 ${activeVideo.id === video._id ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                                        >
                                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeVideo.id === video._id ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-500 group-hover:bg-neutral-700'}`}>
                                                {activeVideo.id === video._id ? <Play className="w-3.5 h-3.5 fill-current" /> : <PlayCircle className="w-4 h-4" />}
                                            </div>
                                            <div className="flex flex-col items-start min-w-0">
                                                <span className={`text-sm font-bold truncate w-full ${activeVideo.id === video._id ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                                                    {video.title}
                                                </span>
                                                <span className="text-[10px] font-black uppercase text-neutral-600 tracking-wider">
                                                    {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            {activeVideo.id === video._id && (
                                                <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Top-level videos (General Lessons) */}
                    {course.videos && course.videos.length > 0 && (
                        <div className="border-b border-neutral-800/50">
                            <button
                                onClick={() => toggleSection('general-videos')}
                                className={`w-full px-6 py-5 flex items-center justify-between hover:bg-neutral-800/50 transition-colors ${expandedSections.includes('general-videos') ? 'bg-neutral-800/30' : ''}`}
                            >
                                <div className="flex items-center gap-3 text-left">
                                    <span className="text-xs font-black text-neutral-600">{String((course.playlists?.length || 0) + 1).padStart(2, '0')}</span>
                                    <span className="text-sm font-bold">General Lessons</span>
                                </div>
                                {expandedSections.includes('general-videos') ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                            </button>

                            {expandedSections.includes('general-videos') && (
                                <div className="bg-neutral-950/30">
                                    {course.videos.map((video, vIdx) => (
                                        <button
                                            key={video._id}
                                            onClick={() => setActiveVideo({ url: video.videoUrl, title: video.title, id: video._id })}
                                            className={`w-full px-8 py-4 flex items-center gap-4 group hover:bg-neutral-800/50 transition-all border-l-4 ${activeVideo.id === video._id ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                                        >
                                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeVideo.id === video._id ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-500 group-hover:bg-neutral-700'}`}>
                                                {activeVideo.id === video._id ? <Play className="w-3.5 h-3.5 fill-current" /> : <PlayCircle className="w-4 h-4" />}
                                            </div>
                                            <div className="flex flex-col items-start min-w-0">
                                                <span className={`text-sm font-bold truncate w-full ${activeVideo.id === video._id ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                                                    {video.title}
                                                </span>
                                                <span className="text-[10px] font-black uppercase text-neutral-600 tracking-wider">
                                                    {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            {activeVideo.id === video._id && (
                                                <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
