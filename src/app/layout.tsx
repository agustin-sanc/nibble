import "@/app/_general/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/app/_general/components/theme-provider";
import { dark } from "@clerk/themes";
import { esES } from "@clerk/localizations";
import { ReactQueryProvider } from "@/app/_general/react-query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Nibble",
  description: "Created by Nibble",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider appearance={{ baseTheme: dark }} localization={esES}>
    <html lang="es">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
