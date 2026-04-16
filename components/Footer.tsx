"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

const footerLinks = {
    platform: [
        { name: "Browse Courses", href: "/courses" },
        { name: "Success Stories", href: "#" },
        { name: "Become an Instructor", href: "#" },
        { name: "Business Solutions", href: "#" },
    ],
    company: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact Support", href: "#" },
        { name: "Terms of Service", href: "#" },
    ],
    social: [
        { name: "Facebook", icon: Facebook, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "Instagram", icon: Instagram, href: "#" },
        { name: "GitHub", icon: Github, href: "#" },
    ]
};

export default function Footer() {
    const pathname = usePathname();
    const isPlayerPage = pathname?.includes('/player');

    if (isPlayerPage) return null;

    return (
        <footer className="bg-secondary/20 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-linear-to-br from-indigo-500 to-violet-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-black text-foreground tracking-tight">EduPlatform</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Empowering learners worldwide through accessible, high-quality online education. Start your journey with us today.
                        </p>
                        <div className="flex items-center gap-4">
                            {footerLinks.social.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                    aria-label={item.name}
                                >
                                    <item.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">Platform</h3>
                        <ul className="space-y-4">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">Company</h3>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">Stay Updated</h3>
                        <p className="text-muted-foreground text-sm mb-6">
                            Join our newsletter for the latest course launches and teaching tips.
                        </p>
                        <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                            </div>
                            <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:brightness-95 transition-all duration-200 shadow-lg shadow-primary/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} EduPlatform Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">Terms of Use</Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
