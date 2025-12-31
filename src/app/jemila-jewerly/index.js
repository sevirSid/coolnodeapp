'use client'
import React, { useState, useEffect } from ‘react’;
import { Menu, X, ChevronDown, Sparkles, Award, Zap, Gift, Instagram, MapPin, MessageCircle } from ‘lucide-react’;

export default function JemilaJewelry() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [activeSection, setActiveSection] = useState(‘accueil’);
const [selectedImage, setSelectedImage] = useState(null);

// Images pour la galerie (vous pouvez remplacer par vos vraies images)
const galleryImages = [
{ id: 1, category: ‘bagues’, url: ‘💍’, title: ‘Bague Élégance Or’, price: ‘2500 MRU’ },
{ id: 2, category: ‘colliers’, url: ‘📿’, title: ‘Collier Prestige’, price: ‘3500 MRU’ },
{ id: 3, category: ‘boucles’, url: ‘👂’, title: ‘Boucles Crystal’, price: ‘2000 MRU’ },
{ id: 4, category: ‘bracelets’, url: ‘⌚’, title: ‘Bracelet Royal’, price: ‘2800 MRU’ },
{ id: 5, category: ‘bagues’, url: ‘💍’, title: ‘Alliance Luxe’, price: ‘3000 MRU’ },
{ id: 6, category: ‘colliers’, url: ‘📿’, title: ‘Pendentif Étoile’, price: ‘2200 MRU’ },
{ id: 7, category: ‘boucles’, url: ‘👂’, title: ‘Créoles Dorées’, price: ‘1800 MRU’ },
{ id: 8, category: ‘bracelets’, url: ‘⌚’, title: ‘Jonc Imperial’, price: ‘3200 MRU’ },
];

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 50);
};
window.addEventListener(‘scroll’, handleScroll);
return () => window.removeEventListener(‘scroll’, handleScroll);
}, []);

const collections = [
{ icon: ‘💍’, name: ‘Bagues Élégantes’, desc: ‘Des designs sophistiqués pour toutes les occasions’ },
{ icon: ‘📿’, name: ‘Colliers Raffinés’, desc: ‘L'élégance à porter au quotidien’ },
{ icon: ‘👂’, name: ‘Boucles d'Oreilles’, desc: ‘Subtiles ou audacieuses, trouvez votre style’ },
{ icon: ‘⌚’, name: ‘Bracelets Chics’, desc: ‘La touche finale parfaite’ }
];

const features = [
{ icon: <Award className="w-12 h-12" />, title: ‘Qualité Garantie’ },
{ icon: <span className="text-5xl">💰</span>, title: ‘Prix Accessibles’ },
{ icon: <Gift className="w-12 h-12" />, title: ‘Designs Uniques’ },
{ icon: <Zap className="w-12 h-12" />, title: ‘Service Rapide’ }
];

const scrollToSection = (id) => {
const element = document.getElementById(id);
if (element) {
element.scrollIntoView({ behavior: ‘smooth’ });
setIsMenuOpen(false);
setActiveSection(id);
}
};

return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
{/* Navigation */}
<nav className={`fixed w-full z-50 transition-all duration-300 ${ scrolled ? 'bg-amber-900/95 backdrop-blur-lg shadow-2xl' : 'bg-amber-900/90' }`}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-20">
<div className="text-3xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
J&J
</div>

```
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {['accueil', 'apropos', 'collections', 'galerie', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-white font-semibold hover:text-yellow-300 transition-colors capitalize ${
                activeSection === section ? 'text-yellow-300' : ''
              }`}
            >
              {section === 'apropos' ? 'À Propos' : section}
            </button>
          ))}
        </div>

        <button className="hidden md:block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/30 hover:bg-white/20 transition-all text-sm font-medium">
          🇫🇷 FR | العربية
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-amber-950/95 backdrop-blur-lg">
        <div className="px-4 py-6 space-y-4">
          {['accueil', 'apropos', 'collections', 'galerie', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="block w-full text-left text-white font-semibold hover:text-yellow-300 transition-colors capitalize py-2"
            >
              {section === 'apropos' ? 'À Propos' : section}
            </button>
          ))}
        </div>
      </div>
    )}
  </nav>

  {/* Hero Section */}
  <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950">
    {/* Animated Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>

    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
      <div className="inline-block mb-6 px-6 py-2 border-2 border-yellow-400 rounded-full">
        <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase">Premium Gold Plated</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in">
        Jemila Jewelry
      </h1>
      
      <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
        L'élégance au cœur du raffinement — Des bijoux inspirés de l'or véritable
      </p>
      
      <button
        onClick={() => scrollToSection('collections')}
        className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-950 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
      >
        Découvrir nos Collections
        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
      </button>
    </div>

    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-8 h-8 text-white/50" />
    </div>
  </section>

  {/* About Section */}
  <section id="apropos" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
          Qui sommes-nous ?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Jemila Jewelry propose des bijoux raffinés imitant parfaitement l'or, avec une qualité 
          exceptionnelle et des designs tendance, pour un style élégant à des prix accessibles.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <Sparkles className="w-16 h-16" />, title: 'Notre Mission', desc: 'Offrir des bijoux haut de gamme inspirés de l\'or véritable. Allier qualité, finesse et esthétique moderne pour toutes les occasions.' },
          { icon: '💎', title: 'Qualité Premium', desc: 'Chaque pièce est conçue avec soin, utilisant des matériaux de haute qualité pour un plaquage durable qui résiste au temps.' },
          { icon: '🎨', title: 'Design Original', desc: 'Des créations uniques et tendance qui s\'adaptent à votre style personnel, des occasions quotidiennes aux événements spéciaux.' }
        ].map((item, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border-2 border-transparent hover:border-yellow-400"
          >
            <div className="text-6xl mb-6 text-amber-900 group-hover:scale-110 transition-transform">
              {typeof item.icon === 'string' ? item.icon : item.icon}
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Collections Section */}
  <section id="collections" className="py-20 px-4 bg-gradient-to-br from-slate-100 to-slate-200">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
          Nos Collections
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez notre sélection de bijoux raffinés, créés pour sublimer chaque moment
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((item, idx) => (
          <div
            key={idx}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="h-64 bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">{item.name}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Why Us Section */}
  <section className="py-20 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
          Pourquoi Jemila Jewelry ?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nous avons gagné la confiance du marché grâce à la haute qualité de nos produits 
          et à l'originalité de nos designs
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="group bg-gradient-to-br from-amber-900 to-amber-950 rounded-2xl p-8 text-center text-white hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <div className="mb-4 flex justify-center text-yellow-400 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Gallery Section */}
  <section id="galerie" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
          Galerie
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez nos plus belles créations en images
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center text-7xl">
              {image.url}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-yellow-400 font-semibold">{image.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Modal pour l'image sélectionnée */}
  {selectedImage && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={() => setSelectedImage(null)}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
        >
          <X className="w-6 h-6 text-amber-900" />
        </button>
        
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center text-9xl p-12 min-h-[400px]">
            {selectedImage.url}
          </div>
          
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-amber-900 mb-4">{selectedImage.title}</h3>
            <p className="text-2xl text-yellow-600 font-bold mb-6">{selectedImage.price}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bijou premium gold plated de haute qualité. Fabriqué avec soin pour vous offrir 
              l'élégance et le raffinement que vous méritez.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/22220316315"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold text-center hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* CTA Section */}
  <section className="py-20 px-4 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Découvrez nos nouveautés exclusives
      </h2>
      <p className="text-xl mb-10 text-white/90">
        Visitez notre exposition et laissez-vous séduire par nos créations uniques
      </p>
      <button
        onClick={() => scrollToSection('contact')}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-950 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
      >
        Nous Contacter
      </button>
    </div>
  </section>

  {/* Contact Section */}
  <section id="contact" className="py-20 px-4 bg-slate-100">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
          Contactez-nous
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nous sommes à votre écoute pour toute question ou demande
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { 
            icon: <MessageCircle className="w-12 h-12" />, 
            title: 'WhatsApp', 
            info: '+222 20 31 63 15', 
            link: 'https://wa.me/22220316315',
            color: 'text-green-600',
            hoverColor: 'hover:text-green-700'
          },
          { 
            icon: <Instagram className="w-12 h-12" />, 
            title: 'Instagram', 
            info: '@jemilaben88', 
            link: 'https://instagram.com/jemilaben88',
            color: 'text-pink-600',
            hoverColor: 'hover:text-pink-700'
          },
          { 
            icon: (
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>
                <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"/>
              </svg>
            ),
            title: 'Snapchat', 
            info: '@jemilaben88', 
            link: 'https://snapchat.com/add/jemilaben88',
            color: 'text-yellow-400',
            hoverColor: 'hover:text-yellow-500'
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`${item.color} flex justify-center mb-4`}>
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">{item.title}</h3>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-lg font-semibold ${item.color} ${item.hoverColor} transition-colors inline-block`}
            >
              {item.info}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-amber-950 text-white py-12 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <div className="text-4xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4">
        Jemila Jewelry
      </div>
      <p className="text-white/80 mb-2">L'élégance au cœur du raffinement</p>
      <p className="text-white/80 mb-8">Premium Gold Plated — Des bijoux qui racontent votre histoire</p>
      
      <div className="flex justify-center gap-6 mb-8">
        <a 
          href="https://wa.me/22220316315" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-5xl hover:scale-110 transition-transform"
          title="WhatsApp"
        >
          💬
        </a>
        <a 
          href="https://instagram.com/jemilaben88" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-5xl hover:scale-110 transition-transform"
          title="Instagram"
        >
          📱
        </a>
        <a 
          href="https://snapchat.com/add/jemilaben88" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-5xl hover:scale-110 transition-transform"
          title="Snapchat"
        >
          👻
        </a>
      </div>
      
      <p className="text-white/50 text-sm">
        © 2024 Jemila Jewelry. Tous droits réservés.
      </p>
    </div>
  </footer>
</div>
```

);
}