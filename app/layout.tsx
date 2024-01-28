import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { fontSans } from '@/lib/fonts';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ClerkProvider } from '@clerk/nextjs';
import MainLayout from './main-layout';
import { ToasterProvider } from '@/providers/toast-provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={cn(
            'bg-background font-sans antialiased',
            fontSans.className
          )}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            <MainLayout>{children}</MainLayout>
            <ThemeSwitcher />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
