import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { ThemeProvider } from "@/app/context/ThemeContext";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "GlobeKart. - Shop smarter",
    description: "GlobeKart. - Shop smarter",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            try {
                                var t = localStorage.getItem('globekart-theme');
                                if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                if (t === 'dark') document.documentElement.classList.add('dark');
                            } catch(e) {}
                        })();
                    `
                }} />
            </head>
            <body className={`${outfit.className} antialiased bg-white dark:bg-slate-900 transition-colors duration-300`}>
                <ThemeProvider>
                    <StoreProvider>
                        <Toaster position="top-right" />
                        {children}
                    </StoreProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
