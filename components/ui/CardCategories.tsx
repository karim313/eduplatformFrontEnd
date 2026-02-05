"use client";

import Image from 'next/image'
import React from 'react'
import { useLanguage } from '@/app/_Context/languageContext'

interface CardCategoriesProps {
    image: string;
    title: string;
    description: string;
}

export default function CardCategories({ image, title, description }: CardCategoriesProps) {
    const { t } = useLanguage();
    return (
        <div className="group relative h-80 w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
            {/* Background Image */}
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-70" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-500 group-hover:translate-y-[-8px]">
                <div className="space-y-3">
                    <h3 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                        {title}
                    </h3>

                    <p className="text-sm leading-relaxed text-neutral-300 line-clamp-2 max-w-[90%] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        {description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 delay-75">
                        {t('home.categories.explore')}
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
