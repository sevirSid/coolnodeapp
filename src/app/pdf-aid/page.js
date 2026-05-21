"use client"

import React, { useState } from 'react';
import AnnoncePDFGenerator from '../components/AnnoncePDFGenerator';

const PDFAidPage = () => {
  const [selectedAid, setSelectedAid] = useState('fitr');
  
  // Données pour chaque type d'Aïd
  const aidData = {
    fitr: {
      titleFr: "LA PRIÈRE DE L'AÏD EL FITR",
      titleAr: "صلاة عيد الفطر",
      defaultInfo: "À partir de 8h30 - A la mosquée de Niort",
      defaultInfoAr: "ابتداءً من الساعة ٨:٣٠ - في مسجد نيور",
      defaultSchedule: [
        { time: "8h30", activity: "Tahleel et Tahmeed", activityAr: "تهليل و تحميد" },
        { time: "9h00", activity: "Sermon en Français", activityAr: "الخطبة بالفرنسية" },
        { time: "9h20", activity: "Prière de l'Aïd", activityAr: "صلاة العيد" },
        { time: "9h30", activity: "Sermon en Arabe", activityAr: "الخطبة بالعربية" }
      ],
      dateNote: "* Le jour de l'Aïd el-Fitr sera le dimanche 30 mars ou 31 mars"
    },
    adha: {
      titleFr: "LA PRIÈRE DE L'AÏD EL ADHA",
      titleAr: "صلاة عيد الأضحى",
      defaultInfo: "À partir de 8h30 - A la mosquée de Niort",
      defaultInfoAr: "ابتداءً من الساعة ٨:٣٠ - في مسجد نيور",
      defaultSchedule: [
        { time: "8h30", activity: "Tahleel et Tahmeed", activityAr: "تهليل و تحميد" },
        { time: "9h00", activity: "Sermon en Français", activityAr: "الخطبة بالفرنسية" },
        { time: "9h20", activity: "Prière de l'Aïd", activityAr: "صلاة العيد" },
        { time: "9h30", activity: "Sermon en Arabe", activityAr: "الخطبة بالعربية" }
      ],
      dateNote: "* Le jour de l'Aïd el-Adha sera le jeudi 19 juin ou 20 juin"
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Générateur d'Annonce Aïd</h1>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          alignItems: 'center',
          backgroundColor: '#f8f8f8',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#2c3e50' }}>
            Choisir l'Aïd :
          </label>
          <select 
            value={selectedAid} 
            onChange={(e) => setSelectedAid(e.target.value)}
            style={{
              padding: '10px 15px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '2px solid #16a085',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}
          >
            <option value="fitr">Aïd El Fitr</option>
            <option value="adha">Aïd El Adha</option>
          </select>
        </div>
      </div>

      {/* Passer les données à AnnoncePDFGenerator */}
      <AnnoncePDFGenerator aidType={selectedAid} aidData={aidData[selectedAid]} />
    </div>
  );
};

export default PDFAidPage;
