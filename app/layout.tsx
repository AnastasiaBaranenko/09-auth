import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: "NoteHub",
  description: "For managing notes",

  openGraph: {
    title: 'NoteHub',
    description: "For managing notes",
    url: 'https://08-zustand-steel-chi.vercel.app/',
    images: [
        {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
        },
      ],
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <AuthProvider> 
        <Header />
        <main>
        {children}
        {modal}
        </main>
    <Footer/>
    </AuthProvider>
    </TanStackProvider>
        </body>
    </html>
  );
}