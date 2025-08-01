"use client"

import React, { useState, useRef } from ‘react’;
import { Printer, FileText, Users, Calendar, Save, Download, Plus, Edit3, Hospital, UserCheck } from ‘lucide-react’;

// Types pour les données du service
interface PersonnelMedical {
nom: string;
prenom: string;
titre: string;
specialite?: string;
}

interface ServiceData {
hopital: string;
service: string;
chefService: PersonnelMedical;
medecinsTraitants: PersonnelMedical[];
residents: PersonnelMedical[];
internes: PersonnelMedical[];
major: PersonnelMedical;
adresse: string;
telephone: string;
email: string;
}

interface PatientData {
nom: string;
prenom: string;
dateNaissance: string;
age: number;
sexe: ‘M’ | ‘F’;
adresse: string;
telephone: string;
numeroSecu: string;
dateEntree: string;
dateSortie?: string;
}

interface DocumentData {
type: ‘note’ | ‘certificat’ | ‘resume’ | ‘lettre’ | ‘rapport_radio’;
titre: string;
contenu: string;
date: string;
medecin: PersonnelMedical;
patient: PatientData;
examenRadio?: {
typeExamen: string;
indication: string;
technique: string;
resultats: string;
conclusion: string;
};
}

const FormulairesMedicaux = () => {
// État pour les données du service
const [serviceData, setServiceData] = useState<ServiceData>({
hopital: “Centre Hospitalier National de Nouakchott”,
service: “Service d’Imagerie Médicale”,
chefService: {
nom: “AMY”,
prenom: “Dr. Abdou”,
titre: “Chef de Service”,
specialite: “Radiologie”
},
medecinsTraitants: [
{ nom: “BOUKHRISSI”, prenom: “Pr. N.”, titre: “Professeur”, specialite: “Radiologie” },
{ nom: “GHAZALY”, prenom: “Dr. M.”, titre: “Radiologue”, specialite: “Radiologie Diagnostique” },
{ nom: “MED”, prenom: “Dr. Nkerrani”, titre: “Radiologue”, specialite: “Radiologie” },
{ nom: “ZEINE”, prenom: “Dr. M.A”, titre: “Radiologue”, specialite: “Radiologie Diagnostique et Interventionnelle” },
{ nom: “El Hadj”, prenom: “Dr. Hamada”, titre: “Radiologue”, specialite: “Radiologie” }
],
residents: [
{ nom: “Youba”, prenom: “Dr.”, titre: “Résident” },
{ nom: “Sidi Bolle”, prenom: “Dr.”, titre: “Résident” },
{ nom: “Aminetou Sidi”, prenom: “Dr.”, titre: “Résident” },
{ nom: “Lemane Mohamed”, prenom: “Dr.”, titre: “Résident” },
{ nom: “Mariem Mahfoudh”, prenom: “Dr.”, titre: “Résident” },
{ nom: “Mohamed Lemine”, prenom: “Dr.”, titre: “Résident” }
],
internes: [],
major: {
nom: “Mamine”,
prenom: “”,
titre: “Major - Manipulateur”,
specialite: “Imagerie Médicale”
},
adresse: “Centre Hospitalier National, BP 612, Nouakchott”,
telephone: “525-21-35 / 38242561-34252229”,
email: “imagerie@chn-nouakchott.mr”
});

const [selectedDocument, setSelectedDocument] = useState<‘note’ | ‘certificat’ | ‘resume’ | ‘lettre’ | ‘rapport_radio’>(‘note’);
const [documentData, setDocumentData] = useState<DocumentData>({
type: ‘note’,
titre: ‘’,
contenu: ‘’,
date: new Date().toISOString().split(‘T’)[0],
medecin: serviceData.chefService,
patient: {
nom: ‘’,
prenom: ‘’,
dateNaissance: ‘’,
age: 0,
sexe: ‘M’,
adresse: ‘’,
telephone: ‘’,
numeroSecu: ‘’,
dateEntree: new Date().toISOString().split(‘T’)[0]
},
examenRadio: {
typeExamen: ‘’,
indication: ‘’,
technique: ‘’,
resultats: ‘’,
conclusion: ‘’
}
});

const [showPersonnelEditor, setShowPersonnelEditor] = useState(false);
const printRef = useRef<HTMLDivElement>(null);

// Fonction pour imprimer
const handlePrint = () => {
if (printRef.current) {
const printContent = printRef.current.innerHTML;
const originalContent = document.body.innerHTML;
document.body.innerHTML = printContent;
window.print();
document.body.innerHTML = originalContent;
window.location.reload();
}
};

// Fonction pour sauvegarder en PDF
const handleSavePDF = () => {
alert(‘Fonction de sauvegarde PDF à implémenter avec une bibliothèque comme jsPDF’);
};

// Fonction pour charger l’exemple TDM
const loadTDMExample = () => {
setDocumentData(prev => ({
…prev,
type: ‘rapport_radio’,
patient: {
…prev.patient,
nom: ‘Mahmoud’,
prenom: ‘Sita’
},
examenRadio: {
typeExamen: ‘TDM TAP’,
indication: ‘ATCD d'une gastrectomie partielle sur une tumeur gastrique.’,
technique: ‘Acquisition hélicoïdale réalisée avec injection du produit de contraste.’,
resultats: `→ Au niveau thoracique :

- Pas de lésion pulmonaire évolutive.
- Pas de dilatation des bronches.
- Pas d’épanchement ou d’épaississement pleuro-péricardique.
- Pas d’anomalie du volume cardiaque.
- Pas d’adénomégalie thoracique. Pas d’anomalie des gros vaisseaux.
- PAC à droite dont le cathéter en place.

→ Au niveau abdomino-pelvien :

- Stigmate de gastrectomie partielle
- Intégrité des organes pleins intra-abdominaux et de la vésicule biliaire.
- Pas de dilatation des voies biliaires ou urinaires.
- Pas de calcul urinaire. Vessie normale.
- Pas de masse pelvienne.
- Pas d’épaississement digestif. Pas de syndrome occlusif radiologique.
- Pas d’anomalie vasculaire.
- Pas d’adénomégalie profonde.
- Pas d’épanchement péritonéal.
- En fenêtre osseuse : pas de lésion osseuse.`,
  conclusion: ‘Pas d'anomalie évolutive aux étages explorés.’
  }
  }));
  setSelectedDocument(‘rapport_radio’);
  };
  
  // Templates de documents
  const renderDocument = () => {
  const { patient, medecin, date, titre, contenu } = documentData;
  
  switch (selectedDocument) {
  case ‘note’:
  return (
  <div className="space-y-6">
  <div className="text-center">
  <h2 className="text-xl font-bold text-blue-800">NOTE MÉDICALE</h2>
  </div>
  
  ```
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Patient :</strong> {patient.prenom} {patient.nom}</div>
          <div><strong>Date :</strong> {new Date(date).toLocaleDateString('fr-FR')}</div>
          <div><strong>Âge :</strong> {patient.age} ans</div>
          <div><strong>Sexe :</strong> {patient.sexe === 'M' ? 'Masculin' : 'Féminin'}</div>
        </div>
  
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">{titre || 'Observations médicales'}</h3>
          <div className="min-h-[200px] whitespace-pre-wrap text-sm leading-relaxed">
            {contenu || 'Contenu de la note médicale...'}
          </div>
        </div>
  
        <div className="flex justify-between items-end mt-8">
          <div className="text-sm">
            <p><strong>Médecin :</strong> {medecin.titre} {medecin.prenom} {medecin.nom}</p>
            {medecin.specialite && <p><strong>Spécialité :</strong> {medecin.specialite}</p>}
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-32 mb-1"></div>
            <p className="text-xs">Signature et cachet</p>
          </div>
        </div>
      </div>
    );
  
  case 'rapport_radio':
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-blue-800">RAPPORT RADIOLOGIQUE</h2>
          <p className="text-sm text-gray-600 mt-1">{documentData.examenRadio?.typeExamen}</p>
        </div>
  
        <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Nom et prénom :</strong> {patient.prenom} {patient.nom}</div>
            <div><strong>Date :</strong> {new Date(date).toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
  
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">Indication :</h3>
            <p className="text-sm bg-gray-50 p-3 rounded min-h-[60px]">
              {documentData.examenRadio?.indication || 'Indication de l\'examen à préciser...'}
            </p>
          </div>
  
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">Technique :</h3>
            <p className="text-sm bg-gray-50 p-3 rounded min-h-[60px]">
              {documentData.examenRadio?.technique || 'Technique d\'acquisition à préciser...'}
            </p>
          </div>
  
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">Résultats :</h3>
            <div className="text-sm bg-gray-50 p-3 rounded min-h-[200px] whitespace-pre-wrap">
              {documentData.examenRadio?.resultats || 'Résultats de l\'examen...'}
            </div>
          </div>
  
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">Conclusion :</h3>
            <div className="text-sm bg-blue-50 p-3 rounded min-h-[80px] border-l-4 border-blue-500">
              {documentData.examenRadio?.conclusion || 'Conclusion de l\'examen à rédiger...'}
            </div>
          </div>
        </div>
  
        <div className="flex justify-between items-end border-t pt-4">
          <div className="text-sm">
            <p><strong>Radiologue :</strong></p>
            <p>{medecin.titre} {medecin.prenom} {medecin.nom}</p>
            {medecin.specialite && <p>{medecin.specialite}</p>}
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-32 mb-1"></div>
            <p className="text-xs">Signature et cachet</p>
          </div>
        </div>
      </div>
    );
  
  default:
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Document en cours de développement...</p>
      </div>
    );
  ```
  
  }
  };
  
  return (
  
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau de configuration */}
        <div className="lg:col-span-1 space-y-6">
          {/* En-tête */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Hospital className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Formulaires Médicaux</h1>
            </div>
            <p className="text-sm text-gray-600">{serviceData.service}</p>
            <p className="text-sm text-gray-600">{serviceData.hopital}</p>
          </div>
  
  ```
      {/* Sélection du type de document */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Type de document</h2>
        <div className="space-y-2">
          {[
            { value: 'note', label: 'Note médicale', icon: Edit3 },
            { value: 'certificat', label: 'Certificat médical', icon: FileText },
            { value: 'resume', label: 'Résumé d\'observation', icon: Users },
            { value: 'lettre', label: 'Lettre médicale', icon: Calendar },
            { value: 'rapport_radio', label: 'Rapport radiologique', icon: UserCheck }
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSelectedDocument(value as any)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                selectedDocument === value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
  
      {/* Informations patient */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Informations patient</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nom"
              value={documentData.patient.nom}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                patient: { ...prev.patient, nom: e.target.value }
              }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={documentData.patient.prenom}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                patient: { ...prev.patient, prenom: e.target.value }
              }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              placeholder="Date de naissance"
              value={documentData.patient.dateNaissance}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                patient: { ...prev.patient, dateNaissance: e.target.value }
              }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Âge"
              value={documentData.patient.age || ''}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                patient: { ...prev.patient, age: parseInt(e.target.value) || 0 }
              }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
  
          <select
            value={documentData.patient.sexe}
            onChange={(e) => setDocumentData(prev => ({
              ...prev,
              patient: { ...prev.patient, sexe: e.target.value as 'M' | 'F' }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
      </div>
  
      {/* Formulaire spécifique aux examens radiologiques */}
      {selectedDocument === 'rapport_radio' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Examen radiologique</h2>
          <div className="space-y-4">
            <select
              value={documentData.examenRadio?.typeExamen || ''}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                examenRadio: { ...prev.examenRadio!, typeExamen: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Sélectionner le type d'examen</option>
              <option value="TDM TAP">TDM Thoraco-Abdomino-Pelvien</option>
              <option value="TDM Thoracique">TDM Thoracique</option>
              <option value="TDM Abdominal">TDM Abdominal</option>
              <option value="IRM">IRM</option>
              <option value="Echographie">Echographie</option>
              <option value="Radiographie">Radiographie</option>
            </select>
  
            <textarea
              placeholder="Indication de l'examen"
              value={documentData.examenRadio?.indication || ''}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                examenRadio: { ...prev.examenRadio!, indication: e.target.value }
              }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
  
            <textarea
              placeholder="Technique utilisée"
              value={documentData.examenRadio?.technique || ''}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                examenRadio: { ...prev.examenRadio!, technique: e.target.value }
              }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
  
            <textarea
              placeholder="Résultats de l'examen"
              value={documentData.examenRadio?.resultats || ''}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                examenRadio: { ...prev.examenRadio!, resultats: e.target.value }
              }))}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            />
  
            <textarea
              placeholder="Conclusion"
              value={documentData.examenRadio?.conclusion || ''}
              onChange={(e) => setDocumentData(prev => ({
                ...prev,
                examenRadio: { ...prev.examenRadio!, conclusion: e.target.value }
              }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      )}
    </div>
  
    {/* Zone d'édition et prévisualisation */}
    <div className="lg:col-span-2 space-y-6">
      {/* Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer</span>
          </button>
          
          <button
            onClick={handleSavePDF}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Sauvegarder PDF</span>
          </button>
          
          <button
            onClick={loadTDMExample}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Exemple TDM</span>
          </button>
        </div>
      </div>
  
      {/* Prévisualisation du document */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Prévisualisation</h2>
        </div>
        
        <div ref={printRef} className="p-8">
          {/* En-tête du service */}
          <div className="border-b-2 border-blue-600 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-blue-800">{serviceData.hopital}</h1>
                <p className="text-lg text-blue-600">{serviceData.service}</p>
                <div className="text-sm text-gray-600 mt-2">
                  <p>{serviceData.adresse}</p>
                  <p>Tél: {serviceData.telephone}</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p><strong>Chef de Service:</strong></p>
                <p>{serviceData.chefService.titre} {serviceData.chefService.prenom} {serviceData.chefService.nom}</p>
              </div>
            </div>
          </div>
  
          {/* Contenu du document */}
          {renderDocument()}
        </div>
      </div>
    </div>
  </div>
  ```
  
    </div>
  );

};

export default FormulairesMedicaux;