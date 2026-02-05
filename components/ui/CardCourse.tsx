import { ArrowRight, BookOpen, Clock, LayoutGrid, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Course } from "@/app/_interface/courseI";
import { useLanguage } from "@/app/_Context/languageContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CourseCard({ course, isEnrolled }: { course: Course, isEnrolled?: boolean }) {
    const [imgSrc, setImgSrc] = useState(course.image || "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800");
    const { t } = useLanguage();
    const targetHref = isEnrolled ? `/courses/${course._id}/player` : `/courses/${course._id}`;

    const playlistVideosCount = course.playlists?.reduce((acc, p) => acc + (p.videos?.length || 0), 0) || 0;
    const topLevelVideosCount = course.videos?.length || 0;
    const lessonsCount = playlistVideosCount + topLevelVideosCount || course.lessons || 0;

    const router = useRouter();
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;

    const handleEnrollClick = (e: React.MouseEvent) => {
        if (!isAuthenticated && !isEnrolled) {
            e.preventDefault();
            e.stopPropagation(); // Just in case, though preventDefault on click inside Link is key
            router.push("/signin");
        }
    };

    return (
        <Link href={targetHref} className="block group h-full">
            <div className="h-full bg-white rounded-[2rem] border border-neutral-100 shadow-xl shadow-neutral-200/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col">
                {/* Image Wrapper */}
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={imgSrc}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={() => {
                            setImgSrc("https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800");
                        }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {isEnrolled && (
                            <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-lg">
                                {t('card.enrolled')}
                            </span>
                        )}
                        {course.tag && (
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
                                {course.tag}
                            </span>
                        )}
                    </div>

                    <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-lg hover:bg-primary hover:text-white transition-all scale-0 group-hover:scale-100 origin-center duration-300">
                            <BookOpen className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-amber-400">
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-sm font-black text-neutral-900">{course.rating || 0}</span>
                        <span className="text-xs text-neutral-400 font-medium">({course.reviews || 0} {t('card.reviews')})</span>
                    </div>

                    <h3 className="text-xl font-black text-neutral-900 mb-3 line-clamp-2 leading-snug tracking-tight group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center">
                            <User className="w-3 h-3 text-neutral-500" />
                        </div>
                        <span className="text-sm text-neutral-600 font-medium">{course.instructor || "Admin Instructor"}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between py-4 border-y border-neutral-50 mb-6">
                        <div className="flex items-center gap-1.5 text-neutral-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold leading-none">{course.hours || 0}h {t('card.total')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-500">
                            <LayoutGrid className="w-4 h-4" />
                            <span className="text-xs font-bold leading-none">{lessonsCount} {t('common.lessons')}</span>
                        </div>
                        <div className="px-2 py-1 bg-neutral-100 rounded text-[10px] font-black text-neutral-500 uppercase">
                            {course.level || "All Levels"}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest leading-none mb-1">
                                {isEnrolled ? t('card.progress') : t('card.price')}
                            </span>
                            <span className="text-2xl font-black text-neutral-900">
                                {isEnrolled ? t('card.joined') : `$${(course.price || 0).toFixed(2)}`}
                            </span>
                        </div>
                        <div
                            onClick={handleEnrollClick}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm hover:translate-x-1 active:scale-95 transition-all shadow-lg ${isEnrolled
                                ? "bg-emerald-600 text-white shadow-emerald-200"
                                : "bg-neutral-900 text-white shadow-black/10"
                                }`}
                        >
                            {isEnrolled ? t('card.openplaylist') : t('course.enroll')}
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}