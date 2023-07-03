import './globals.css';
import { Inter } from 'next/font/google';
import { SnackbarProvider } from 'notistack';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const inter = Inter({ subsets: ['latin'], preload: true });

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
        <SnackbarProvider>{children}</SnackbarProvider>
        <Footer />
      </body>
    </html>
  );
}
