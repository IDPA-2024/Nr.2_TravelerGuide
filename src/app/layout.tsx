import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import UserProvider from "@/context/useUser";
import TokenProvider from "@/context/useToken";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lunch Guide",
  description: "Find your food easily with Lunch Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="http://lunch-guide.ch/favicon.ico" sizes="any" />
      </head>
      <AppRouterCacheProvider>
        <body className={inter.className}>
          <TokenProvider>
            <UserProvider>{children}</UserProvider>
          </TokenProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
