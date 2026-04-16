"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useLanguage } from '@/app/_Context/languageContext'
import { ArrowRight, Code, Palette, BarChart3, Binary, Brain, HeartPulse } from 'lucide-react'
import { toast } from 'sonner'

interface CardCategoriesProps {
    image: string;
    title: string;
    description: string;
    iconType?: 'design' | 'tech' | 'business' | 'dev' | 'personal' | 'health';
}

const IconMap = {
    design: Palette,
    tech: Binary,
    business: BarChart3,
    dev: Code,
    personal: Brain,
    health: HeartPulse
};

export default function CardCategories({ image, title, description, iconType = 'dev' }: CardCategoriesProps) {
    const { t, language } = useLanguage();
    const Icon = IconMap[iconType] || Code;

    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        toast.success(language === 'ar' ? `!Exploring ${title}` : `Exploring ${title}!`);
        setTimeout(() => {
            window.location.href = '/courses';
        }, 300);
    };

    return (
        <div className="feature-card group relative h-96 w-full overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)] cursor-pointer">
            {/* Background Image with optimized loading and hover effect */}
            <Image
                src={image}
                alt={title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-60 group-hover:brightness-110"
            />

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent transition-opacity duration-700 opacity-100 group-hover:opacity-90" />

            {/* Top Shine Effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

            {/* Content Container */}
            <div onClick={handleCardClick} className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 z-10 cursor-pointer">
                <div className="relative transition-transform duration-700 group-hover:translate-y-[-10px]">
                    {/* Floating Icon Badge */}
                    <div className="mb-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-xl">
                        <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-3xl font-black tracking-tighter text-white mb-3 group-hover:text-primary-foreground transition-colors duration-500 drop-shadow-sm">
                        {title}
                    </h3>

                    <p className="text-sm font-medium leading-relaxed text-neutral-300 line-clamp-2 max-w-[90%] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0">
                        {description}
                    </p>

                    {/* Action Button */}
                    <div className="mt-8 flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0 delay-100">
                        <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex items-center gap-2">
                            {t('home.categories.explore')}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />
        </div>
    );
}
