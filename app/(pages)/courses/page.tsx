"use client";

import React, { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Star,
    Clock,
    User,
    ArrowRight,
    BookOpen,
    LayoutGrid
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CourseCard from '@/components/ui/CardCourse';



import { useToken } from '@/app/_Context/tokenContext';
import { useLanguage } from '@/app/_Context/languageContext';
import { Course, CoursesResponse } from '@/app/_interface/courseI';
import { MyCoursesResponse } from '@/app/_interface/myCoursesI';
import { getCourses } from '@/app/_helper/getCourses';
import { useSession } from 'next-auth/react';

export default function Courses() {
    const { token } = useToken();
    const { t } = useLanguage();
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const session = useSession();
    async function fetchCourses() {
        try {
            // Fetch all courses
            const result = await getCourses(token);
            if (result.success) {
                setCourses(result.data);
            }

            // Fetch enrolled courses if token exists
            if (token) {
                const response = await fetch('https://educational-platform-api2-production-2097.up.railway.app/api/enrollments/my-courses', {
                    method: 'GET',
                    cache: 'no-store', // Ensure we don't get a cached response
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const enrolledResult: MyCoursesResponse = await response.json();
                if (enrolledResult.success) {
                    // Filter out any potential nulls if a course was deleted but enrollment remains
                    const ids = new Set(enrolledResult.data?.filter(c => c && c._id).map(c => c._id) || []);
                    setEnrolledIds(ids);
                }
            }
        } catch (error) {
            console.error("Error fetching courses or enrollments:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [token]);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = (courses || []).filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (course as any).description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <main className="min-h-screen pt-24 pb-20 bg-neutral-50">
            {/* Hero Section */}
            <section className="relative transition-all pt-12 pb-16 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/courses/hero-bg.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-neutral-50" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-neutral-900">
                        {t('courses.hero.title').split(' ').slice(0, 2).join(' ')} <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">{t('courses.hero.title').split(' ').slice(2).join(' ')}</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-neutral-600 mb-10 leading-relaxed">
                        {t('courses.hero.subtitle')}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 start-5 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary transition-colors">
                            <Search className="w-5 h-5 rtl:flip" />
                        </div>
                        <input
                            type="text"
                            placeholder={t('courses.search.placeholder')}
                            className="w-full bg-white ps-14 pe-36 py-5 rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-200 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-lg font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="absolute end-3 top-3 bottom-3 px-6 rounded-xl bg-neutral-900 text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10">
                            {t('courses.search.button')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6">

                {/* Courses Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map(course => {
                            const isEnrolled = enrolledIds.has(course._id);
                            return (
                                <CourseCard
                                    key={course._id}
                                    isEnrolled={isEnrolled}
                                    course={course}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-300">
                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-2">{t('courses.notfound.title')}</h3>
                        <p className="text-neutral-500">{t('courses.notfound.subtitle')}</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-6 text-primary font-bold underline"
                        >
                            {t('courses.notfound.reset')}
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}

