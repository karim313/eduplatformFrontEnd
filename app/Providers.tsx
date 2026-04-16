'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import TokenContextProvider from './_Context/tokenContext';
import { LanguageProvider } from './_Context/languageContext';
import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <LanguageProvider>
                    <TokenContextProvider>
                        {children}
                        <Toaster position="top-center" richColors />
                    </TokenContextProvider>
                </LanguageProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
