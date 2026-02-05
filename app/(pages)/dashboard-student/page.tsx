"use client"
import React, { useState, useEffect } from 'react';
import CardEnrolled from '@/components/ui/CardEnrolled';
import { useToken } from '@/app/_Context/tokenContext';
import { MyCourse, MyCoursesResponse } from '@/app/_interface/myCoursesI';
import { getCourses } from '@/app/_helper/getCourses';
import { Course } from '@/app/_interface/courseI';
import { User, UserResponse } from '@/app/_interface/userI';
import { useLanguage } from '@/app/_Context/languageContext';


export default function StudentDashboard() {
    const [enrolledCourses, setEnrolledCourses] = useState<(MyCourse & { image?: string })[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useToken();
    const { t } = useLanguage();

    useEffect(() => {
        async function loadDashboardData() {
            if (!token) return;

            setIsLoading(true);
            try {
                // 1. Fetch user profile
                const userResponse = await fetch('https://educational-platform-api2-production.up.railway.app/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const userResult: UserResponse = await userResponse.json();
                if (userResult.success) {
                    setUser(userResult.data);
                }

                // 2. Fetch all courses to get images and details
                const coursesResult = await getCourses(token);
                const allCourses = coursesResult.success ? coursesResult.data : [];
                console.log("All courses fetched:", allCourses.length);

                // 2. Fetch enrolled courses
                const response = await fetch('https://educational-platform-api2-production.up.railway.app/api/enrollments/my-courses', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const enrolledResult: MyCoursesResponse = await response.json();
                console.log("Enrolled raw result:", enrolledResult);

                if (enrolledResult.success && Array.isArray(enrolledResult.data)) {
                    // 3. Handle multiple response structures (nested course or flat object)
                    const enrichedCourses = enrolledResult.data.map((item: any) => {
                        // Extract course object: it could be directly in 'item' or nested in 'item.course'
                        let courseData = item.course && typeof item.course === 'object' ? item.course : item;

                        // Extract ID: it could be '_id' or 'id'
                        const targetId = courseData._id || courseData.id || (typeof item.course === 'string' ? item.course : null);

                        // Find matching details from the full course list if needed
                        const matchingCourse = allCourses.find((c: any) => c._id === targetId || c.id === targetId);

                        // If we only have an ID but found the course in allCourses, use that data
                        if (typeof courseData === 'string' || (!courseData.title && matchingCourse)) {
                            courseData = matchingCourse;
                        }

                        if (!courseData || !courseData.title) {
                            console.warn("Could not find course data for item:", item);
                            return null;
                        }

                        return {
                            ...courseData,
                            _id: targetId, // Ensure _id is present for keys
                            image: courseData.image || matchingCourse?.image || "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800"
                        };
                    }).filter(Boolean); // Remove nulls if any courses couldn't be resolved

                    setEnrolledCourses(enrichedCourses);
                } else {
                    console.error("Failed to fetch enrolled courses or data is not an array:", enrolledResult);
                }
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboardData();
    }, [token]);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-neutral-50/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Areas */}
                    <div className="flex-1">
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{t('dashboard.enrolled')}</h2>
                                    <p className="text-sm font-medium text-neutral-500 mt-1">
                                        {enrolledCourses.length > 0
                                            ? t('dashboard.progress').replace('{count}', enrolledCourses.length.toString())
                                            : t('dashboard.noenrolled')}
                                    </p>
                                </div>
                                <button className="text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors">
                                    {t('dashboard.viewall')}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {isLoading ? (
                                    <div className="flex items-center gap-3 p-8">
                                        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                        <p className="font-bold text-neutral-600">{t('dashboard.loading')}</p>
                                    </div>
                                ) : enrolledCourses.length === 0 ? (
                                    <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-neutral-200">
                                        <p className="text-neutral-500 font-bold">{t('dashboard.nocourses')}</p>
                                    </div>
                                ) : (
                                    enrolledCourses.map(course => (
                                        <CardEnrolled key={course._id} course={course as any} />
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Dashboard Sidebar */}
                    <aside className="w-full lg:w-80">
                        <div className="sticky top-32 space-y-6">
                            {/* Profile Card */}
                            <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                                <div className="space-y-1 mb-8">
                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">
                                        {new Date().getHours() < 12 ? t('dashboard.greeting.morning') : new Date().getHours() < 18 ? t('dashboard.greeting.afternoon') : t('dashboard.greeting.evening')}
                                    </p>
                                    <h3 className="text-2xl font-black text-neutral-900">{user?.name || 'Student'}</h3>
                                    <p className="text-sm font-medium text-neutral-500">{user?.email}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-black text-neutral-400 uppercase tracking-wider">Weekly Goal</span>
                                            <span className="text-lg font-black text-indigo-600">65%</span>
                                        </div>
                                        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-600 w-[65%] rounded-full" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
                                            <p className="text-xl font-black text-indigo-600">{enrolledCourses.length}</p>
                                            <p className="text-[10px] font-black text-indigo-400 uppercase">Courses</p>
                                        </div>
                                        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                                            <p className="text-xl font-black text-emerald-600">4</p>
                                            <p className="text-[10px] font-black text-emerald-400 uppercase">Certificates</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
