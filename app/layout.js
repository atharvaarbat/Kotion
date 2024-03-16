'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AppContextProvider, { AppContext }  from "@/context/AppContext";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  
  return (
    <html lang="en"  suppressHydrationWarning={true}>
      <head>
        <title>Kotion</title>
        <link rel="icon" href="" sizes="any" />
      </head>
      <body className={inter.className + ' h-screen'}>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
          <AppContextProvider>
          {children}
          </AppContextProvider>
         

        
        
        </ThemeProvider>
        </body>
    </html>
  );
}
