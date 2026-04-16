import React, { useState } from 'react';
import Image from 'next/image';
import { PlayCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/_Context/languageContext';

interface EnrolledCourseCardProps {
    course: {
        _id: string;
        title: string;
        image: string;
        lessons?: number;
        playlists?: any[];
        videos?: any[];
    };
}

export default function CardEnrolled({ course }: EnrolledCourseCardProps) {
    const [imgSrc, setImgSrc] = useState(course.image || "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800");
    const { t } = useLanguage();

    const playlistVideosCount = course.playlists?.reduce((acc, p) => acc + (p.videos?.length || 0), 0) || 0;
    const topLevelVideosCount = course.videos?.length || 0;
    const lessonsCount = playlistVideosCount + topLevelVideosCount || course.lessons || 0;

    return (
        <Link href={`/courses/${course._id}/player`} className="group h-full">
            <div className="bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col h-full group-hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={imgSrc}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={() => {
                            setImgSrc("https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800");
                        }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                            <PlayCircle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-md">{t('common.inprogress')}</span>
                    </div>

                    <h4 className="text-xl font-black text-foreground mb-6 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                    </h4>

                    <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <PlayCircle className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold">{lessonsCount} {t('common.videos')}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-black text-primary group-hover:gap-3 transition-all">
                            {t('common.continue')}
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
