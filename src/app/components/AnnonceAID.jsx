"use client"

import React, { useState, useRef } from 'react';
import { Download, Edit2, Upload } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const AnnonceAID = () => {
  // États pour les textes modifiables
  const [title, setTitle] = useState("LA PRIÈRE DE L'AÏD EL FITR");
  const [subtitle, setSubtitle] = useState("صلاة عيد الفطر");
  const [info, setInfo] = useState("À partir de 7h30 - A la mosquée de Niort");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  
  // État pour l'image
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleTitleEdit = () => setIsEditingTitle(true);
  const handleSubtitleEdit = () => setIsEditingSubtitle(true);
  const handleInfoEdit = () => setIsEditingInfo(true);
  
  const handleTitleSave = (e) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };
  
  const handleSubtitleSave = (e) => {
    if (e.key === 'Enter') {
      setIsEditingSubtitle(false);
    }
  };
  
  const handleInfoSave = (e) => {
    if (e.key === 'Enter') {
      setIsEditingInfo(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
const handleDownloadPDF = () => {
  const input = document.getElementById('annonce-container');
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 0);
    pdf.save('Annonce_Aid.pdf');
  });
  };

  // Style inline pour simuler le CSS
  const styles = {
    annonceContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f8f8f8',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    logoContainer: {
      position: 'relative',
      width: '120px',
      height: '120px',
      margin: '0 auto 20px',
      cursor: 'pointer'
    },
    logo: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ccc',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#555',
      fontSize: '12px',
      objectFit: 'cover'
    },
    uploadIcon: {
      position: 'absolute',
      bottom: '5px',
      right: '5px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: 'white',
      borderRadius: '50%',
      padding: '5px'
    },
    fileInput: {
      display: 'none'
    },
    titleContainer: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer'
    },
    editIcon: {
      position: 'absolute',
      right: '-25px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#888',
      visibility: 'hidden'
    },
    titleHover: {
      '&:hover .editIcon': {
        visibility: 'visible'
      }
    },
    titleInput: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#2c3e50',
      textAlign: 'center',
      border: 'none',
      borderBottom: '2px solid #16a085',
      background: 'transparent',
      width: '100%',
      outline: 'none'
    },
    subtitleInput: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#16a085',
      textAlign: 'center',
      border: 'none',
      borderBottom: '2px solid #16a085',
      background: 'transparent',
      width: '100%',
      outline: 'none'
    },
    infoInput: {
      fontSize: '18px',
      color: '#333',
      textAlign: 'center',
      border: 'none',
      borderBottom: '2px solid #16a085',
      background: 'transparent',
      width: '100%',
      outline: 'none'
    },
    h1: {
      color: '#2c3e50',
      margin: '10px 0',
      fontSize: '28px'
    },
    h2: {
      color: '#16a085',
      margin: '10px 0 20px',
      fontSize: '24px'
    },
    info: {
      fontSize: '18px',
      margin: '20px 0',
      color: '#333'
    },
    programme: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '25px 0',
      fontSize: '16px',
      textAlign: 'center'
    },
    th: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '12px',
      border: '1px solid #ddd'
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd'
    },
    trEven: {
      backgroundColor: '#f2f2f2'
    },
    important: {
      backgroundColor: '#fff3cd',
      color: '#856404',
      padding: '15px',
      margin: '20px 0',
      borderRadius: '5px',
      border: '1px solid #ffeeba'
    },
    note: {
      fontSize: '14px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '20px'
    },
    downloadBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: '#2c3e50',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '20px auto 10px',
      transition: 'background-color 0.3s'
    }
  };

  return (
    <div id="annonce-container" style={styles.annonceContainer}>
      {/* Logo avec upload d'image */}
      <div style={styles.logoContainer} onClick={handleImageClick}>
        {imagePreview ? (
          <img src={imagePreview} alt="Logo mosquée" style={styles.logo} />
        ) : (
          <div style={styles.logo}>Logo Mosquée Niort</div>
        )}
        <div style={styles.uploadIcon}>
          <Upload size={16} />
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={styles.fileInput} 
          onChange={handleImageChange} 
          accept="image/*" 
        />
      </div>

      {/* Titre modifiable */}
      <div style={styles.titleContainer} onClick={handleTitleEdit}>
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleTitleSave}
            onBlur={() => setIsEditingTitle(false)}
            style={styles.titleInput}
            autoFocus
          />
        ) : (
          <h1 style={styles.h1}>
            {title}
            <Edit2 size={16} style={{ ...styles.editIcon, marginLeft: '10px', display: 'inline-block' }} />
          </h1>
        )}
      </div>

      {/* Sous-titre modifiable */}
      <div style={styles.titleContainer} onClick={handleSubtitleEdit}>
        {isEditingSubtitle ? (
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            onKeyDown={handleSubtitleSave}
            onBlur={() => setIsEditingSubtitle(false)}
            style={styles.subtitleInput}
            autoFocus
          />
        ) : (
          <h2 style={styles.h2}>
            {subtitle}
            <Edit2 size={16} style={{ ...styles.editIcon, marginLeft: '10px', display: 'inline-block' }} />
          </h2>
        )}
      </div>

      {/* Info modifiable */}
      <div style={styles.titleContainer} onClick={handleInfoEdit}>
        {isEditingInfo ? (
          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            onKeyDown={handleInfoSave}
            onBlur={() => setIsEditingInfo(false)}
            style={styles.infoInput}
            autoFocus
          />
        ) : (
          <p style={styles.info}>
            <span dangerouslySetInnerHTML={{ __html: info.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            <Edit2 size={16} style={{ ...styles.editIcon, marginLeft: '10px', display: 'inline-block' }} />
          </p>
        )}
      </div>

      <table style={styles.programme}>
        <thead>
          <tr>
            <th style={styles.th}>Horaire</th>
            <th style={styles.th}>Programme</th>
            <th style={styles.th}>البرنامج</th>
            <th style={styles.th}>التوقيت</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>7h30</td>
            <td style={styles.td}>Tahleel et Tahmeed</td>
            <td style={styles.td}>تهليل و تحميد</td>
            <td style={styles.td}>7:30</td>
          </tr>
          <tr style={styles.trEven}>
            <td style={styles.td}>8h00</td>
            <td style={styles.td}>Sermon en Français</td>
            <td style={styles.td}>الخطبة بالفرنسية</td>
            <td style={styles.td}>8:00</td>
          </tr>
          <tr>
            <td style={styles.td}>8h15</td>
            <td style={styles.td}>Prière de l'Aïd</td>
            <td style={styles.td}>صلاة العيد</td>
            <td style={styles.td}>8:15</td>
          </tr>
          <tr style={styles.trEven}>
            <td style={styles.td}>8h30</td>
            <td style={styles.td}>Sermon en Arabe</td>
            <td style={styles.td}>الخطبة بالعربية</td>
            <td style={styles.td}>8:30</td>
          </tr>
        </tbody>
      </table>

      <div style={styles.important}>
        <p>⚠️ <strong>Faire vos ablutions à la maison</strong></p>
        <p>⚠️ <strong>Ramener votre propre tapis de prière</strong></p>
      </div>

      <p style={styles.note}>* Le jour de l'Aïd el-Fitr sera le dimanche 30 mars ou 31 mars</p>
      
      <button 
        style={styles.downloadBtn} 
        onClick={handleDownloadPDF}
      >
        <Download size={18} />
        Télécharger en PDF
      </button>
    </div>
  );
};

export default AnnonceAID;
