import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";

interface TokenContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export default function TokenContextProvider({ children }: { children: ReactNode }) {
    // We keep the state interface for compatibility, but 'token' is now derived mainly from session
    // 'setToken' might not be needed as much if we drive everything from session, 
    // but we'll keep it as a no-op or local override if strictly necessary for backward compat.
    // Ideally, for NextAuth, we don't manually setToken, we signIn/signOut.

    const { data: session } = useSession();
    const token = session?.user?.token || null;

    const setToken = (newToken: string | null) => {
        // With NextAuth, we generally don't manually set the token this way.
        // This function is kept to satisfy the context interface.
        // If you need to "login", use signIn(). If "logout", use signOut().
        console.warn("setToken was called but authentication is now handled by NextAuth session.");
    };

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useToken must be used within a TokenContextProvider");
    }
    return context;
}
