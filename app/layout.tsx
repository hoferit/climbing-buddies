import './globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Climbing Buddies | Climbing Buddies',
    template: '%s | Climbing Buddies',
  },
  description: 'A Social Networking App designed for Climbers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
