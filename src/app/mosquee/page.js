// src/app/mosquee/page.js
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import defaultLogo from '/IMG_4552.jpeg'; // Chemin vers votre image par défaut
//import mosqueeImage from '/IMG_4564.jpeg'; // Chemin vers votre image par défaut

export default function MosqueePage() {
  const [activeTab, setActiveTab] = useState('accueil');

  // Horaires de prière (exemple)
  const prayerTimes = {
    fajr: "05:30",
    dhuhr: "13:18",
    asr: "16:30",
    maghrib: "19:25",
    isha: "20:35",
    jumuah: "13:20"
  };

  // Événements à venir (exemple)
  const upcomingEvents = [
    {
      id: 1,
      title: "Iftar communautaire",
      date: "15 avril 2025",
      description: "Repas de rupture du jeûne organisé à la mosquée. Tous les membres de la communauté sont les bienvenus."
    },
    {
      id: 2,
      title: "Conférence sur l'éducation islamique",
      date: "22 avril 2025",
      description: "Notre imam partagera des connaissances sur l'importance de l'éducation en Islam."
    },
    {
      id: 3,
      title: "Collecte de dons pour les nécessiteux",
      date: "1er mai 2025",
      description: "Journée spéciale de collecte pour aider les familles dans le besoin."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bannière et Navigation */}
      <header className="bg-green-700 text-white">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold">Mosquée de Niort</h1>
              <p className="text-green-100">Centre islamique et culturel</p>
            </div>
            <div className="space-x-2">
              <a href="tel:+33123456789" className="bg-green-600 hover:bg-green-800 px-4 py-2 rounded">
                Appeler
              </a>
               {activeTab === 'contact' && (
              <a href="#map" className="bg-green-600 hover:bg-green-800 px-4 py-2 rounded">
                Nous trouver
              </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="bg-green-800">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab('accueil')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'accueil' ? 'border-b-2 border-white bg-green-900' : 'hover:bg-green-900'}`}
              >
                Accueil
              </button>
              <button 
                onClick={() => setActiveTab('services')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'services' ? 'border-b-2 border-white bg-green-900' : 'hover:bg-green-900'}`}
              >
                Services
              </button>
              <button 
                onClick={() => setActiveTab('prieres')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'prieres' ? 'border-b-2 border-white bg-green-900' : 'hover:bg-green-900'}`}
              >
                Horaires des prières
              </button>
              <button 
                onClick={() => setActiveTab('evenements')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'evenements' ? 'border-b-2 border-white bg-green-900' : 'hover:bg-green-900'}`}
              >
                Événements
              </button>
              <button 
                onClick={() => setActiveTab('dons')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'dons' ? 'border-b-2 border-white bg-green-900' : 'hover:bg-green-900'}`}
              >
                Faire un don
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'contact' ? 'border-b-2 border-white bg-green-900' : 'hover:bg-green-900'}`}
              >
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-4">
        {/* Accueil */}
        {activeTab === 'accueil' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Bienvenue à la Mosquée de Niort</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <p className="mb-4">
                    La Mosquée de Niort ACMN est un lieu de culte et de rassemblement pour tous les musulmans de la région. 
                    Notre mission est de servir la communauté en offrant un espace de prière, d'éducation et de fraternité.
                  </p>
                  <p className="mb-4">
                    Fondée en 2005, notre mosquée s'efforce de promouvoir les valeurs islamiques tout en favorisant le dialogue interreligieux 
                    et l'intégration sociale.
                  </p>
                  <p>
                    Que vous soyez résident de longue date ou nouveau dans la communauté, nous vous accueillons chaleureusement 
                    et vous invitons à participer à nos activités.
                  </p>
                </div>
                <div className="md:w-1/3 bg-gray-200 rounded-lg flex items-center justify-center h-48 md:h-auto">
                  <Image src="/IMG_4564.jpeg" alt="Image de mosquée" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-green-700 mb-2">Prochaine prière</h3>
                <p className="text-3xl font-bold">Maghrib: {prayerTimes.maghrib}</p>
                <Link href="#" onClick={() => setActiveTab('prieres')} className="text-green-600 hover:underline block mt-2">
                  Voir tous les horaires →
                </Link>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-green-700 mb-2">Jumua (vendredi)</h3>
                <p className="text-3xl font-bold">{prayerTimes.jumuah}</p>
                <p className="text-gray-600 mt-2">Khutbah commence 30 minutes avant</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-green-700 mb-2">Prochain événement</h3>
                <p className="font-bold">{upcomingEvents[0].title}</p>
                <p className="text-gray-600">{upcomingEvents[0].date}</p>
                <Link href="#" onClick={() => setActiveTab('evenements')} className="text-green-600 hover:underline block mt-2">
                  Voir tous les événements →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Annonces</h2>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <h3 className="font-bold text-yellow-800">Préparations pour le Ramadan</h3>
                <p className="text-yellow-700">
                  Nous commençons les préparatifs pour le mois sacré du Ramadan. 
                  Des bénévoles sont recherchés pour aider à l'organisation des iftars communautaires.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Services */}
        {activeTab === 'services' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Nos Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-xl font-medium text-green-700 mb-2">Prières quotidiennes</h3>
                <p>
                  Notre mosquée est ouverte pour les cinq prières quotidiennes. 
                  Les heures de prière sont ajustées en fonction des saisons.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-xl font-medium text-green-700 mb-2">Éducation islamique</h3>
                <p>
                  Nous offrons des cours de Coran, de langue arabe et d'éducation islamique pour tous les âges.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-xl font-medium text-green-700 mb-2">Mariages</h3>
                <p>
                  Notre imam peut officier des mariages islamiques. 
                  Contactez-nous pour planifier une cérémonie.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-xl font-medium text-green-700 mb-2">Services funéraires</h3>
                <p>
                  Nous offrons des services complets pour les funérailles islamiques, 
                  y compris la prière janazah et l'aide aux arrangements funéraires.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-xl font-medium text-green-700 mb-2">Conseils et soutien</h3>
                <p>
                  Notre imam est disponible pour offrir des conseils sur des questions religieuses 
                  et personnelles. Prenez rendez-vous au secrétariat.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-xl font-medium text-green-700 mb-2">Bibliothèque</h3>
                <p>
                  Notre bibliothèque contient une collection de livres islamiques en 
                  français, arabe et anglais disponibles pour consultation et prêt.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Horaires des prières */}
        {activeTab === 'prieres' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Horaires des Prières</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border px-4 py-2 text-left">Prière</th>
                    <th className="border px-4 py-2 text-left">Début</th>
                    <th className="border px-4 py-2 text-left">Iqama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-medium">Fajr</td>
                    <td className="border px-4 py-2">{prayerTimes.fajr}</td>
                    <td className="border px-4 py-2">05:45</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border px-4 py-2 font-medium">Dhuhr</td>
                    <td className="border px-4 py-2">{prayerTimes.dhuhr}</td>
                    <td className="border px-4 py-2">13:00</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-medium">Asr</td>
                    <td className="border px-4 py-2">{prayerTimes.asr}</td>
                    <td className="border px-4 py-2">15:45</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border px-4 py-2 font-medium">Maghrib</td>
                    <td className="border px-4 py-2">{prayerTimes.maghrib}</td>
                    <td className="border px-4 py-2">19:20</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-medium">Isha</td>
                    <td className="border px-4 py-2">{prayerTimes.isha}</td>
                    <td className="border px-4 py-2">21:15</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border px-4 py-2 font-medium">Jumuah (vendredi)</td>
                    <td className="border px-4 py-2">12:45 (Khutbah)</td>
                    <td className="border px-4 py-2">{prayerTimes.jumuah}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-medium text-green-700 mb-2">Calcul des horaires</h3>
              <p className="mb-4">
                Nos horaires de prière sont calculés selon la méthode de l'Union des Organisations Islamiques de France (UOIF)
                qui utilise un angle de 12° pour Fajr et 12° pour Isha.
              </p>
              <p>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  Télécharger le calendrier des prières (PDF) →
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Événements */}
        {activeTab === 'evenements' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Événements à venir</h2>
            
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="text-xl font-medium">{event.title}</h3>
                  <p className="text-green-700 font-bold">{event.date}</p>
                  <p className="mt-2">{event.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-medium text-green-700 mb-3">Activités régulières</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded p-3">
                  <h4 className="font-medium">Cours de Coran pour enfants</h4>
                  <p className="text-gray-600">Samedi et dimanche, 10h-12h</p>
                </div>
                
                <div className="border rounded p-3">
                  <h4 className="font-medium">Cours d'arabe</h4>
                  <p className="text-gray-600">Mercredi, 18h-20h</p>
                </div>
                
                <div className="border rounded p-3">
                  <h4 className="font-medium">Cercle d'étude pour femmes</h4>
                  <p className="text-gray-600">Dimanche, 14h-16h</p>
                </div>
                
                <div className="border rounded p-3">
                  <h4 className="font-medium">Conférence hebdomadaire</h4>
                  <p className="text-gray-600">Vendredi après Isha</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href="#" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full"
              >
                Calendrier complet des événements
              </a>
            </div>
          </div>
        )}

        {/* Dons */}
        {activeTab === 'dons' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Soutenir la Mosquée</h2>
            
            <p className="mb-6">
              Votre générosité permet à notre mosquée de continuer sa mission et d'offrir des services essentiels à la communauté.
              Tous les dons sont précieux, quelle que soit leur taille.
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-medium text-green-700 mb-2">Projets actuels nécessitant des fonds</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Rénovation de la salle de prière des femmes</li>
                <li>Expansion de notre école coranique</li>
                <li>Achat de nouveaux livres pour la bibliothèque</li>
                <li>Aide aux familles nécessiteuses de notre communauté</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium text-green-700 mb-3">Méthodes de don</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Virement bancaire</h4>
                  <p className="text-sm">
                      Association Mosquée de Niort<br />
                    IBAN: FR76 1234 5678 9101 1121 3141 516<br />
                    BIC: AGRIFPPR123
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Don mensuel</h4>
                  <p className="text-sm mb-3">
                    Soutenez-nous régulièrement avec un prélèvement automatique.
                  </p>
                  <a 
                    href="#" 
                    className="text-green-700 hover:underline text-sm"
                  >
                    Formulaire de prélèvement →
                  </a>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Don en personne</h4>
                  <p className="text-sm">
                    Vous pouvez faire un don directement à la mosquée pendant les heures d'ouverture.
                    Des reçus fiscaux sont disponibles.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Don en ligne</h4>
                  <p className="text-sm mb-3">
                    Faites un don sécurisé en utilisant notre plateforme en ligne.
                  </p>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-full"
                  >
                    Faire un don maintenant
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-gray-600 text-sm border-t pt-4">
              <p>
                Les dons à l'Association Mosquée de Niort sont déductibles des impôts à hauteur de 66% 
                dans la limite de 20% du revenu imposable. Un reçu fiscal vous sera délivré pour tout don.
              </p>
            </div>
          </div>
        )}

        {/* Contact */}
        {activeTab === 'contact' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Contactez-nous</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium text-green-700 mb-3">Informations de contact</h3>
                
                <div className="space-y-3">
                  <p>
                    <span className="font-medium">Adresse :</span><br />
                    48 bis rue Henri Sellier<br />
                    79000 NIORT, France
                  </p>
                  
                  <p>
                    <span className="font-medium">Téléphone :</span><br />
                    <a href="tel:+33123456789" className="text-green-700 hover:underline">+33 (0)1 23 45 67 89</a>
                  </p>
                  
                  <p>
                    <span className="font-medium">Email :</span><br />
                    <a href="mailto:contact@mosquee-acmn.fr" className="text-green-700 hover:underline">contact@mosquee-acmn.fr</a>
                  </p>
                  
                  <div>
                    <span className="font-medium">Heures d'ouverture du secrétariat :</span>
                    <ul className="mt-1">
                      <li>Lundi - Vendredi : 9h - 18h</li>
                      <li>Samedi : 10h - 17h</li>
                      <li>Dimanche : Fermé</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-green-700 mb-3">Suivez-nous</h3>
                  <div className="flex space-x-3">
                    <a href="https://www.facebook.com/share/15R4ipvV2F/?mibextid=wwXIfr" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      f
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                      t
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                      y
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                      w
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-green-700 mb-3">Envoyez-nous un message</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                      Envoyer le message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
           <div className="mt-8" id="map">
  <h3 className="text-xl font-medium text-green-700 mb-3">Nous trouver</h3>
  
  <div className="relative w-full h-64 rounded-lg overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.115022149591!2d-0.4861257!3d46.3148211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48072f8225493027%3A0x7b6393d9ff8924e0!2sACMN%20-%20Mosqu%C3%A9e%20de%20Niort!5e0!3m2!1sfr!2sfr!4v1711744870745!5m2!1sfr!2sfr"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  <p className="mt-2 text-sm text-gray-600">
    Notre mosquée est facilement accessible par les transports en commun. 
    Bus ligne 1, 6 et 7 (arrêt pôle atlantique) et Bus 2, 21, et 22 (arrêt Bonnevay).
  </p>
</div>
          </div>
        )}
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Mosquée de Niort</h3>
              <p className="text-gray-400">
                Un centre islamique au service de la communauté depuis 2005.
              </p>
              <p className="text-gray-400 mt-2">
                48 bis rue Henri Sellier<br />
                79000 NIORT, France
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={() => setActiveTab('accueil')} className="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="#" onClick={() => setActiveTab('services')} className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" onClick={() => setActiveTab('prieres')} className="text-gray-400 hover:text-white">Horaires des prières</a></li>
                <li><a href="#" onClick={() => setActiveTab('evenements')} className="text-gray-400 hover:text-white">Événements</a></li>
                <li><a href="#" onClick={() => setActiveTab('dons')} className="text-gray-400 hover:text-white">Faire un don</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-2">
                Abonnez-vous à notre newsletter pour recevoir les dernières informations et annonces de la mosquée.
              </p>
              <form className="flex mt-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none flex-grow"
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r"
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Mosquée de Niort. Tous droits réservés.</p>
            <p className="mt-2">
              <a href="#" className="hover:text-white">Mentions légales</a> | 
              <a href="#" className="hover:text-white ml-3">Politique de confidentialité</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}