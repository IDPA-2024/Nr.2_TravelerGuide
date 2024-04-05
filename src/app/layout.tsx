import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import UserProvider from "@/context/useUser";
import TokenProvider from "@/context/useToken";
import RestaurantsProvider from "@/context/useRestaurants";

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
      <AppRouterCacheProvider>
        <body className={inter.className}>
          <RestaurantsProvider>
            <TokenProvider>
              <UserProvider>{children}</UserProvider>
            </TokenProvider>
          </RestaurantsProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
