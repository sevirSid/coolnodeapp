// next.config.js - Configuration pour l'exportation statique
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Génère une version statique de votre site
  images: {
    unoptimized: true, // Nécessaire pour l'export statique
  },
  // Définir le chemin de base si vous déployez dans un sous-dossier
  // basePath: '/mosquee',
  
  // Optimisations supplémentaires
  compiler: {
    // Supprime les console.log en production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
