import React from 'react'

interface CardProps {
    icon: string;
    title: string;
    description: string;
}

export default function Card({ icon, title, description }: CardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
            {/* Decorative background element */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-card-foreground">
                        {title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
