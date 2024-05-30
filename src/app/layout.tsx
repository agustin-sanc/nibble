import "@/app/_cross/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/app/_cross/components/theme-provider";
import { dark } from "@clerk/themes";
import { esES } from "@clerk/localizations";
import { ReactQueryProvider } from "@/app/_cross/react-query-provider";
import React, { type ReactNode } from "react";
import { Toaster } from "@/app/_cross/components/toaster";
import { SidePanel } from "@/app/_cross/components/side-panel";
import SidePanelItem from "@/app/_cross/components/side-panel-item";
import { Home, Users } from "lucide-react";
import { ModeToggle } from "@/app/_cross/components/mode-toggle";
import { ScrollArea } from "@/app/_cross/components/scroll-area";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Nibble",
  description: "Created by Nibble",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <ClerkProvider appearance={{ baseTheme: dark }} localization={esES}>
    <html lang="es">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <div className="flex h-screen">
              <SidePanel>
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <SidePanelItem
                      href="/dashboard"
                      icon={<Home />}
                      label="Inicio"
                    />
                    <SidePanelItem
                      href="/courses"
                      icon={<Users />}
                      label="Cursos"
                    />
                  </div>

                  <ModeToggle />
                </div>
              </SidePanel>

              <ScrollArea className="w-full pl-8 pr-8">
                <div className="first:mt-7 last:mb-7">{children}</div>
              </ScrollArea>
            </div>
          </ReactQueryProvider>
          <Toaster closeButton />
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
