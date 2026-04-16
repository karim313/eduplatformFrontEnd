import React from 'react'

interface CardProps {
    icon: string;
    title: string;
    description: string;
}

export default function Card({ icon, title, description }: CardProps) {
    return (
        <div className="card group relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10">
            {/* Decorative background element */}
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl ring-1 ring-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-black tracking-tight text-card-foreground">
                        {title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
