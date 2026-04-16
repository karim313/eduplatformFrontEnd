"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/_Context/languageContext";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// Throttle utility function
const throttle = (func: (...args: any[]) => void, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const throttledScroll = useRef(throttle(() => {
        setScrolled(window.scrollY > 20);
    }, 150)).current;

    useEffect(() => {
        setMounted(true);
    }, []);

    const isPlayerPage = pathname?.includes('/player');
    // Derived state for authentication to replace 'token' usage
    const isAuthenticated = !!session?.user;

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    // Handle scroll effect for glassmorphism with throttle
    useEffect(() => {
        window.addEventListener("scroll", throttledScroll);
        return () => window.removeEventListener("scroll", throttledScroll);
    }, [throttledScroll]);

    return (
        <nav
            data-main-navbar="true"
            className={`${isPlayerPage ? "static bg-background" : "fixed top-0"} z-50 w-full transition-all duration-300 border-b ${scrolled || isPlayerPage
                ? "bg-background/80 backdrop-blur-xl border-border py-3 shadow-sm shadow-black/5"
                : "bg-background/40 backdrop-blur-md border-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-xl">E</span>
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-600 to-gray-500 dark:from-gray-300 dark:to-gray-100 group-hover:to-foreground transition-all">
                        EduPlatform
                    </span>
                </Link>

                {/* Mobile button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center bg-neutral-800/50 rounded-full text-white overflow-hidden"
                >
                    <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`} />
                    <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 " : "translate-y-1"}`} />
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    <NavLink href="/" label={t('nav.home')} icon={<HomeIcon />} active={pathname === "/"} />
                    <NavLink href="/courses" label={t('nav.courses')} icon={<CoursesIcon />} active={pathname?.startsWith("/courses")} />
                    <NavLink href="/contact" label={t('nav.contact')} icon={<ContactIcon />} active={pathname?.startsWith("/contact")} />

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:text-black hover:bg-black/5 transition-all group ml-1"
                        aria-label="Toggle Theme"
                    >
                        {mounted && (
                            theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />
                        )}
                        {!mounted && <div className="w-4 h-4" />}
                    </button>

                    {/* Language Switcher */}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-neutral-400 hover:text-foreground hover:bg-foreground/5 transition-all group ml-1"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
                    </button>


                    {!isAuthenticated ? (
                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-neutral-800">
                            <Link
                                href="/signin"
                                className="text-sm font-medium text-neutral-400 hover:text-foreground transition-colors"
                            >
                                {t('nav.signin')}
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                {t('nav.getstarted')}
                            </Link>
                        </div>
                    ) : (
                        /* Profile/Dashboard Dropdown */
                        <div 
                            className={`relative ml-4 pl-4 border-l ${language === 'ar' ? 'border-r pr-4 pl-0' : 'border-l pl-4'} border-neutral-200`}
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary hover:text-primary/90 transition-all duration-300 border border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-primary/60 shadow-lg shadow-primary/30 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                        {session?.user?.name?.split(' ')[0]?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-semibold">
                                        {language === 'ar' ? 'أهلاً' : 'Hello'}
                                    </span>
                                    <span className="text-xs font-medium text-primary/70">
                                        {session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || 'User'}
                                    </span>
                                </div>
                                <svg className={`w-4 h-4 transition-transform duration-200 text-primary/60 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div
                                    className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-full mt-2 w-56 bg-background/90 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl overflow-hidden p-1 z-50`}
                                >
                                    <DropdownItem href="/dashboard-student" label={t('nav.overview')} icon={<OverviewIcon />} />
                                    <DropdownItem href="/dashboard-student/settings" label={t('nav.settings')} icon={<SettingsIcon />} />
                                    <div className="h-px bg-border my-1 mx-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors text-sm"
                                    >
                                        <LogoutIcon />
                                        {t('nav.signout')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="flex flex-col gap-2 p-6 bg-background border-t border-border mt-4">
                    <li><MobileNavLink href="/" label={t('nav.home')} onClick={() => setMenuOpen(false)} /></li>
                    <li><MobileNavLink href="/courses" label={t('nav.courses')} onClick={() => setMenuOpen(false)} /></li>
                    <li><MobileNavLink href="/contact" label={t('nav.contact')} onClick={() => setMenuOpen(false)} /></li>

                    {/* Theme Switcher Mobile */}
                    <li>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-foreground/5 transition-colors text-sm font-medium"
                        >
                            {mounted && (
                                theme === 'dark' ? (
                                    <>
                                        <Sun className="w-5 h-5" />
                                        <span>Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="w-5 h-5" />
                                        <span>Dark Mode</span>
                                    </>
                                )
                            )}
                            {!mounted && <div className="w-5 h-5" />}
                        </button>
                    </li>

                    {/* Language Switcher Mobile */}
                    <li>
                        <button
                            onClick={() => {
                                setLanguage(language === 'en' ? 'ar' : 'en');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-foreground/5 transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            <span>{language === 'en' ? 'العربية' : 'English'}</span>
                        </button>
                    </li>

                    <div className="h-px bg-neutral-100 my-2" />

                    {!isAuthenticated ? (
                        <div className="grid grid-cols-2 gap-3 pb-2 mt-2">
                            <Link
                                href="/signin"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center px-4 py-3 rounded-xl border border-neutral-200 text-neutral-400 font-medium hover:text-black hover:bg-black/5 transition-all"
                            >
                                {t('nav.signin')}
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all"
                            >
                                {t('nav.getstarted')}
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-2 mt-2">
                            <MobileNavLink href="/dashboard-student" label={t('nav.dashboard')} onClick={() => setMenuOpen(false)} isPrimary />
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="block w-full px-4 py-3 rounded-xl text-center font-bold text-red-500 hover:bg-red-50 transition-all border border-red-100"
                            >
                                {t('nav.signout')}
                            </button>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
}

function NavLink({ href, label, icon, active = false }: { href: string; label: string; icon: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all group ${active
                ? "text-foreground bg-foreground/10"
                : "text-neutral-400 hover:text-foreground hover:bg-foreground/5"
                }`}
        >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-200">
                {icon}
            </span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}

function DropdownItem({ href, label, icon, className = "" }: { href: string; label: string; icon: React.ReactNode, className?: string }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:text-foreground hover:bg-foreground/5 transition-colors text-neutral-400 text-sm ${className}`}
        >
            {icon}
            {label}
        </Link>
    );
}

function MobileNavLink({ href, label, onClick, isPrimary = false }: { href: string; label: string; onClick: () => void; isPrimary?: boolean }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block w-full px-4 py-3 rounded-xl text-center font-medium transition-all ${isPrimary
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-neutral-400 hover:text-foreground hover:bg-foreground/5"
                }`}
        >
            {label}
        </Link>
    );
}

// Icons
const HomeIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const CoursesIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const PricingIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
    </svg>
);

const ContactIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const OverviewIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const LearningIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LogoutIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
