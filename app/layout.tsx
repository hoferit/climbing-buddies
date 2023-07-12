import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const nunitoSans = Nunito_Sans({ subsets: ['latin'], preload: true });

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
      <body className={nunitoSans.className}>
        <div className="min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
