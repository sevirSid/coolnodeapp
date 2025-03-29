// src/app/mosquee/layout.js
import { Metadata } from 'next';

// Définissez l'URL complète vers votre image
const logoUrl = ' https://brico-images.vercel.app/IMG_4552.jpeg''; // Remplacez par l'URL réelle de votre logo

export const metadata = {
  title: 'Mosquée de Niort - Centre islamique et culturel',
  description: 'La Mosquée de Niort ACMN est un lieu de culte et de rassemblement pour tous les musulmans de la région. Notre mission est de servir la communauté en offrant un espace de prière, d\'éducation et de fraternité.',
  metadataBase: new URL('https://brico-images.vercel.app'),
  openGraph: {
    type: 'website',
    title: 'Mosquée de Niort - Centre islamique et culturel',
    description: 'Découvrez nos services, horaires de prière et événements à venir.',
    url: 'https://brico-images.vercel.app/mosquee',
    siteName: 'Mosquée de Niort',
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: 'Logo de la Mosquée de Niort',
      },
    ],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mosquée de Niort - Centre islamique et culturel',
    description: 'Découvrez nos services, horaires de prière et événements à venir.',
    images: [logoUrl],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
};

export default function MosqueeLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}