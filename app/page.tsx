"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import CardCategories from "@/components/ui/CardCategories";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/_Context/languageContext";

export default function Home() {
  const { t } = useLanguage();

  const cardData = [
    {
      icon: "📚",
      title: t('home.features.quality.title'),
      description: t('home.features.quality.desc')
    },
    {
      icon: "🎓",
      title: t('home.features.certified.title'),
      description: t('home.features.certified.desc')
    },
    {
      icon: "💳",
      title: t('home.features.payments.title'),
      description: t('home.features.payments.desc')
    }
  ];
  const categoryData: { image: string, title: string, description: string, iconType: 'design' | 'tech' | 'business' | 'dev' | 'personal' | 'health' }[] = [
    {
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: t('home.categories.technology.title'),
      description: t('home.categories.technology.desc'),
      iconType: 'tech'
    },
    {
      image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: t('home.categories.design.title'),
      description: t('home.categories.design.desc'),
      iconType: 'design'
    },
    {
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Development",
      description: "Full-stack, mobile, and backend development courses from scratch.",
      iconType: 'dev'
    },
    {
      image: "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: t('home.categories.business.title'),
      description: t('home.categories.business.desc'),
      iconType: 'business'
    },
    {
      image: "https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Marketing",
      description: "Digital marketing, social media, and brand growth strategies.",
      iconType: 'dev'
    },
    {
      image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Self Growth",
      description: "Improve your productivity, mindset, and personal skills.",
      iconType: 'personal'
    }
  ];



  return (
    <main className="relative min-h-screen bg-background pt-24 lg:pt-0 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-12 lg:pt-40 lg:pb-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:text-left text-center">
          {/* Hero Content */}
          <div className="flex-1 space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: Advanced AI Courses Out Now
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
              {t('home.hero.title').split(' ')[0]} <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-indigo-500">{t('home.hero.title').split(' ')[1]}</span> {t('home.hero.title').split(' ').slice(2).join(' ')}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('home.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Button
                asChild
                className="h-16 px-10 text-lg font-black rounded-2xl bg-linear-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-primary text-white shadow-2xl shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.98] group relative overflow-hidden border border-white/10"
              >
                <Link href="/courses">
                  <span className="relative z-10 flex items-center gap-3">
                    {t('home.hero.browse')}
                    <Rocket className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-16 px-10 text-lg font-bold rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 active:scale-[0.98] group"
              >
                <Link href="/dashboard-student" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500 transition-transform group-hover:rotate-12" />
                  {t('home.hero.mydashboard')}
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-8 justify-center lg:justify-start grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="text-sm font-semibold text-muted-foreground">Trusted by teams at:</div>
              <div className="flex gap-6 font-bold text-xl tracking-tighter italic">
                <span>VOLT</span>
                <span>ZEPHYR</span>
                <span>APEX</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="flex-1 w-full max-w-2xl relative lg:-mt-24">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/5 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <Image
                src="/images/programming-background-collage.jpg"
                className="w-full object-cover aspect-[4/3] scale-105"
                alt="Learning Platform Hero"
                width={800}
                height={600}
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
            </div>
            {/* Decorative accents */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-0" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-24 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t('home.features.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-32 relative overflow-hidden bg-neutral-50/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_70%)] from-primary/5 to-transparent -z-10" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Explore by Field
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900">
                Browse our <span className="text-primary italic">Expert</span> Categories
              </h2>
              <p className="text-neutral-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                {t('home.categories.subtitle')}
              </p>
            </div>
            <Button asChild variant="ghost" className="h-14 px-8 rounded-2xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900 font-black text-sm uppercase tracking-widest gap-3 shadow-xl shadow-neutral-200/50 group">
              <Link href="/courses">
                {t('home.categories.viewall')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categoryData.map((category, index) => (
              <CardCategories
                key={index}
                image={category.image}
                title={category.title}
                description={category.description}
                iconType={category.iconType}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer/CTA */}
      <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="rounded-[2.5rem] md:rounded-[4rem] bg-linear-to-br from-primary to-indigo-700 p-10 md:p-24 text-center text-white relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(79,70,229,0.4)]">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-indigo-400/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter">
              {t('home.cta.title')}
            </h2>
            <p className="text-base md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <div className="pt-4">
              <Button asChild className="h-14 md:h-20 px-8 md:px-16 text-lg md:text-2xl font-black rounded-2xl md:rounded-[1.5rem] bg-white text-primary hover:bg-neutral-50 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                <Link href="/register">
                  {t('home.cta.button')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

