'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.courses': 'Courses',
        'nav.contact': 'Contact',
        'nav.signin': 'Sign In',
        'nav.getstarted': 'Get Started',
        'nav.dashboard': 'Dashboard',
        'nav.overview': 'Overview',
        'nav.settings': 'Settings',
        'nav.signout': 'Sign Out',

        // Home Page
        'home.hero.title': 'Learn Without Limits',
        'home.hero.subtitle': 'Transform your career with world-class lessons from industry leaders. Master the skills of tomorrow, today.',
        'home.hero.browse': 'Browse Courses',
        'home.hero.mydashboard': 'My Dashboard',
        'home.features.title': 'Everything you need to succeed',
        'home.features.subtitle': 'We provide the tools and resources to help you master any subject from scratch.',
        'home.features.quality.title': 'High Quality Courses',
        'home.features.quality.desc': 'Learn from professional instructors with well-structured content.',
        'home.features.certified.title': 'Certified Learning',
        'home.features.certified.desc': 'Get certificates after completing courses to boost your career.',
        'home.features.payments.title': 'Flexible Payments',
        'home.features.payments.desc': 'Pay easily using Stripe or Vodafone Cash with secure transactions.',
        'home.categories.title': 'Explore Categories',
        'home.categories.subtitle': 'Browse classes by industry and find your next passion project.',
        'home.categories.viewall': 'View All Categories',
        'home.categories.design.title': 'Design',
        'home.categories.design.desc': 'UI/UX, graphic design, and creative skills to build stunning visuals.',
        'home.categories.technology.title': 'Technology',
        'home.categories.technology.desc': 'Software development, web apps, programming languages, and modern tech skills.',
        'home.categories.business.title': 'Business',
        'home.categories.business.desc': 'Marketing, management, and entrepreneurship skills.',
        'home.categories.explore': 'Explore Category',

        // Home CTA
        'home.cta.title': 'Ready to start your journey?',
        'home.cta.subtitle': 'Join over 50,000 students worldwide and start learning new skills today.',
        'home.cta.button': 'Get Started for Free',

        // Courses Page
        'courses.hero.title': 'Explore Our Premium Courses',
        'courses.hero.subtitle': 'Join over 25,000+ students worldwide and master the latest industry-standard skills with our world-class instructors.',
        'courses.search.placeholder': 'What do you want to learn today?',
        'courses.search.button': 'Search',
        'courses.filters': 'Filters',
        'courses.notfound.title': 'No courses found',
        'courses.notfound.subtitle': "We couldn't find any courses matching your search criteria.",
        'courses.notfound.reset': 'Reset all filters',

        // Course Detail
        'course.enroll': 'Enroll Now',
        'course.addtocart': 'Add to Cart',
        'course.share': 'Share',
        'course.wishlist': 'Wishlist',
        'course.whatyoulearn': "What you'll learn",
        'course.curriculum': 'Curriculum',
        'course.about': 'About',
        'course.instructor': 'Instructor',
        'course.features': 'Course Features:',
        'course.certificate': 'Certificate of completion',
        'course.lifetime': 'Lifetime access',
        'course.resources': 'Downloadable resources',

        // Dashboard
        'dashboard.greeting.morning': 'Good Morning',
        'dashboard.greeting.afternoon': 'Good Afternoon',
        'dashboard.greeting.evening': 'Good Evening',
        'dashboard.enrolled': 'My Enrolled Courses',
        'dashboard.courses': 'Courses',
        'dashboard.certificates': 'Certificates',
        'dashboard.weeklygoal': 'Weekly Goal',
        'dashboard.viewall': 'View All',
        'dashboard.loading': 'Loading courses...',
        'dashboard.nocourses': 'No enrolled courses found.',
        'dashboard.progress': 'You have {count} courses in progress',
        'dashboard.noenrolled': "You haven't enrolled in any courses yet",

        // Common
        'common.loading': 'Loading...',
        'common.continue': 'Continue',
        'common.inprogress': 'In Progress',
        'common.videos': 'Videos',
        'common.lessons': 'Lessons',
        'common.hours': 'hours',
        'common.minutes': 'minutes',

        // Card
        'card.enrolled': 'Enrolled',
        'card.reviews': 'reviews',
        'card.total': 'total',
        'card.progress': 'Progress',
        'card.price': 'Price',
        'card.joined': 'Joined',
        'card.openplaylist': 'Open Playlist',
    },
    ar: {
        // Navbar
        'nav.home': 'الرئيسية',
        'nav.courses': 'الدورات',
        'nav.contact': 'تواصل معنا',
        'nav.signin': 'تسجيل الدخول',
        'nav.getstarted': 'ابدأ الآن',
        'nav.dashboard': 'لوحة التحكم',
        'nav.overview': 'نظرة عامة',
        'nav.settings': 'الإعدادات',
        'nav.signout': 'تسجيل الخروج',

        // Home Page
        'home.hero.title': 'تعلم بدون حدود',
        'home.hero.subtitle': 'حول مسيرتك المهنية مع دروس عالمية المستوى من قادة الصناعة. أتقن مهارات الغد، اليوم.',
        'home.hero.browse': 'تصفح الدورات',
        'home.hero.mydashboard': 'لوحة التحكم',
        'home.features.title': 'كل ما تحتاجه للنجاح',
        'home.features.subtitle': 'نوفر لك الأدوات والموارد لمساعدتك على إتقان أي موضوع من الصفر.',
        'home.features.quality.title': 'دورات عالية الجودة',
        'home.features.quality.desc': 'تعلم من مدربين محترفين مع محتوى منظم بشكل جيد.',
        'home.features.certified.title': 'تعلم معتمد',
        'home.features.certified.desc': 'احصل على شهادات بعد إكمال الدورات لتعزيز مسيرتك المهنية.',
        'home.features.payments.title': 'مدفوعات مرنة',
        'home.features.payments.desc': 'ادفع بسهولة باستخدام Stripe أو فودافون كاش مع معاملات آمنة.',
        'home.categories.title': 'استكشف الفئات',
        'home.categories.subtitle': 'تصفح الدورات حسب المجال واعثر على مشروعك الشغوف التالي.',
        'home.categories.viewall': 'عرض جميع الفئات',
        'home.categories.design.title': 'التصميم',
        'home.categories.design.desc': 'تصميم واجهات المستخدم، التصميم الجرافيكي، والمهارات الإبداعية لبناء تصاميم مذهلة.',
        'home.categories.technology.title': 'التكنولوجيا',
        'home.categories.technology.desc': 'تطوير البرمجيات، تطبيقات الويب، لغات البرمجة، والمهارات التقنية الحديثة.',
        'home.categories.business.title': 'الأعمال',
        'home.categories.business.desc': 'التسويق، الإدارة، ومهارات ريادة الأعمال.',
        'home.categories.explore': 'استكشف الفئة',

        // Home CTA
        'home.cta.title': 'مستعد لبدء رحلتك؟',
        'home.cta.subtitle': 'انضم إلى أكثر من 50,000 طالب حول العالم وابدأ في تعلم مهارات جديدة اليوم.',
        'home.cta.button': 'ابدأ مجاناً',

        // Courses Page
        'courses.hero.title': 'استكشف دوراتنا المميزة',
        'courses.hero.subtitle': 'انضم إلى أكثر من 25,000 طالب حول العالم وأتقن أحدث المهارات المعتمدة في الصناعة مع مدربينا ذوي المستوى العالمي.',
        'courses.search.placeholder': 'ماذا تريد أن تتعلم اليوم؟',
        'courses.search.button': 'بحث',
        'courses.filters': 'الفلاتر',
        'courses.notfound.title': 'لم يتم العثور على دورات',
        'courses.notfound.subtitle': 'لم نتمكن من العثور على أي دورات تطابق معايير البحث الخاصة بك.',
        'courses.notfound.reset': 'إعادة تعيين جميع الفلاتر',

        // Course Detail
        'course.enroll': 'سجل الآن',
        'course.addtocart': 'أضف إلى السلة',
        'course.share': 'مشاركة',
        'course.wishlist': 'المفضلة',
        'course.whatyoulearn': 'ما ستتعلمه',
        'course.curriculum': 'المنهج',
        'course.about': 'حول الدورة',
        'course.instructor': 'المدرب',
        'course.features': 'مميزات الدورة:',
        'course.certificate': 'شهادة إتمام',
        'course.lifetime': 'وصول مدى الحياة',
        'course.resources': 'موارد قابلة للتحميل',

        // Dashboard
        'dashboard.greeting.morning': 'صباح الخير',
        'dashboard.greeting.afternoon': 'مساء الخير',
        'dashboard.greeting.evening': 'مساء الخير',
        'dashboard.enrolled': 'دوراتي المسجلة',
        'dashboard.courses': 'الدورات',
        'dashboard.certificates': 'الشهادات',
        'dashboard.weeklygoal': 'الهدف الأسبوعي',
        'dashboard.viewall': 'عرض الكل',
        'dashboard.loading': 'جاري تحميل الدورات...',
        'dashboard.nocourses': 'لم يتم العثور على دورات مسجلة.',
        'dashboard.progress': 'لديك {count} دورة قيد التقدم',
        'dashboard.noenrolled': 'لم تسجل في أي دورات بعد',

        // Common
        'common.loading': 'جاري التحميل...',
        'common.continue': 'متابعة',
        'common.inprogress': 'قيد التقدم',
        'common.videos': 'فيديوهات',
        'common.lessons': 'دروس',
        'common.hours': 'ساعات',
        'common.minutes': 'دقائق',

        // Card
        'card.enrolled': 'مسجل',
        'card.reviews': 'تقييمات',
        'card.total': 'إجمالي',
        'card.progress': 'التقدم',
        'card.price': 'السعر',
        'card.joined': 'منضم',
        'card.openplaylist': 'فتح قائمة التشغيل',
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load language from localStorage
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLanguageState(savedLang);
            document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = savedLang;
        }
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, []);

    const t = useCallback((key: string): string => {
        return translations[language][key as keyof typeof translations['en']] || key;
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
