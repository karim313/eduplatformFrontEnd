"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import CardCategories from "@/components/ui/CardCategories";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/_Context/languageContext";
import { useCallback, useEffect, useMemo, useState, lazy, Suspense } from "react";

const CinematicIntro = lazy(() => import("@/components/CinematicIntro"));

export default function Home() {
  const { t, language } = useLanguage();

  // ✅ FIXED STATE
  const [showIntro, setShowIntro] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [typedTitle, setTypedTitle] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const heroPhrases = useMemo(
    () =>
      language === "ar"
        ? ["تعلم بدون حدود", "طور مهاراتك باحتراف", "ابدأ مستقبلك اليوم"]
        : ["Learn Without Limits", "Build Skills Like a Pro", "Start Your Future Today"],
    [language]
  );

  // ✅ INIT INTRO (FIX)
  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem("cinematic-intro-seen");
      setShowIntro(seen !== "1");
    } catch {
      setShowIntro(false);
    }

    setIsReady(true);
  }, []);

  // ✅ SAFETY FALLBACK (مهم)
  useEffect(() => {
    const forceShow = setTimeout(() => {
      setShowIntro(false);
    }, 7000);

    return () => clearTimeout(forceShow);
  }, []);

  useEffect(() => {
    setTypedTitle("");
    setPhraseIndex(0);
    setIsDeleting(false);
  }, [language]);

  // Typing animation
  useEffect(() => {
    const currentPhrase = heroPhrases[phraseIndex];
    let timeoutId: number;

    if (!isDeleting && typedTitle === currentPhrase) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 700);
    } else if (isDeleting && typedTitle.length === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
      }, 220);
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedTitle((prev) =>
          isDeleting
            ? currentPhrase.slice(0, Math.max(prev.length - 1, 0))
            : currentPhrase.slice(0, prev.length + 1)
        );
      }, isDeleting ? 45 : 105);
    }

    return () => window.clearTimeout(timeoutId);
  }, [heroPhrases, isDeleting, phraseIndex, typedTitle]);

  const handleIntroComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem("cinematic-intro-seen", "1");
    } catch {}

    setShowIntro(false);
  }, []);

  const cardData = [
    {
      icon: "📚",
      title: t("home.features.quality.title"),
      description: t("home.features.quality.desc"),
    },
    {
      icon: "🎓",
      title: t("home.features.certified.title"),
      description: t("home.features.certified.desc"),
    },
    {
      icon: "💳",
      title: t("home.features.payments.title"),
      description: t("home.features.payments.desc"),
    },
  ];

  type IconType = "tech" | "design" | "dev" | "business" | "personal" | "health";

const categoryData: {
  image: string;
  title: string;
  description: string;
  iconType: IconType;
}[] = [
  {
    image: "/images/andrelyra-technology-298256_1920.jpg",
    title: t("home.categories.technology.title"),
    description: t("home.categories.technology.desc"),
    iconType: "tech",
  },
  {
    image: "/images/startupstockphotos-startup-3267505_1920.jpg",
    title: t("home.categories.design.title"),
    description: t("home.categories.design.desc"),
    iconType: "design",
  },
  {
    image: "/images/ronaldcandonga-job-5382501.jpg",
    title: t("home.categories.business.title"),
    description: t("home.categories.business.desc"),
    iconType: "business",
  },
];

  return (
    <main className="relative min-h-screen bg-background pt-24 lg:pt-0 overflow-x-hidden">

      {/* ✅ INTRO FIX */}
      {isReady && showIntro && (
        <Suspense fallback={null}>
          <CinematicIntro onComplete={handleIntroComplete} />
        </Suspense>
      )}

      {/* Hero */}
      <section className="relative container mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className={`flex flex-col items-center gap-16 lg:flex-row text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>

          <div className="flex-1 space-y-10 max-w-2xl">

            <div className="space-y-4">
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black leading-tight ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{typedTitle}</span>
                <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} animate-pulse text-primary`}>|</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("home.hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base px-10 py-7 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 rounded-2xl font-semibold">
                <Link href="/courses">
                  {t("home.hero.browse")}
                  <Rocket className="ml-3 w-6 h-6" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-base px-10 py-7 border-2 border-primary/20 hover:border-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 rounded-2xl font-semibold">
                <Link href="/dashboard-student">
                  <Sparkles className="mr-3 w-6 h-6" />
                  {t("home.hero.mydashboard")}
                </Link>
              </Button>
            </div>

          </div>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl"></div>
              <Image
                src="/images/programming-background-collage.jpg"
                width={800}
                height={600}
                alt="hero"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("home.features.title") || "Why Choose Us"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle") || "Discover the benefits of learning with our platform"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardData.map((card, i) => (
              <Card key={i} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("home.categories.title") || "Explore Categories"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.categories.subtitle") || "Find the perfect course for your learning journey"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.map((cat, i) => (
              <CardCategories key={i} {...cat} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}