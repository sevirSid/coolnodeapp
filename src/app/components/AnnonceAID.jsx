"use client"

import React, { useState, useRef } from 'react';
import { Download, Edit2, Upload, MapPin } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AnnonceAID = () => {
  // États pour les textes modifiables
  const [title, setTitle] = useState("LA PRIÈRE DE L'AÏD EL FITR");
  const [subtitle, setSubtitle] = useState("صلاة عيد الفطر");
  const [info, setInfo] = useState("À partir de 7h30 - A la mosquée de Niort");
  const [infoArabic, setInfoArabic] = useState("ابتداءً من الساعة ٧:٣٠ - في مسجد نيور");
  const [address, setAddress] = useState("48 bis rue Henri Sellier, 79000 NIORT, France");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingInfoArabic, setIsEditingInfoArabic] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  // État pour l'image
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const printContainerRef = useRef(null);

  const handleTitleEdit = () => setIsEditingTitle(true);
  const handleSubtitleEdit = () => setIsEditingSubtitle(true);
  const handleInfoEdit = () => setIsEditingInfo(true);
  const handleInfoArabicEdit = () => setIsEditingInfoArabic(true);
  const handleAddressEdit = () => setIsEditingAddress(true);
  
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

  const handleInfoArabicSave = (e) => {
    if (e.key === 'Enter') {
      setIsEditingInfoArabic(false);
    }
  };

  const handleAddressSave = (e) => {
    if (e.key === 'Enter') {
      setIsEditingAddress(false);
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
    // Créer un clone du conteneur pour la manipulation avant impression
    const printContainer = printContainerRef.current;
    const clonedContainer = printContainer.cloneNode(true);
    
    // Appliquer des styles temporaires au clone
    clonedContainer.style.width = "550px";  // Définir une largeur fixe
    clonedContainer.style.position = "absolute";
    clonedContainer.style.left = "-9999px";
    clonedContainer.style.top = "-9999px";
    clonedContainer.style.padding = "20px";
    
    // Supprimer les icônes d'édition et d'upload du clone
    const uploadIcons = clonedContainer.querySelectorAll('.upload-icon');
    const editIcons = clonedContainer.querySelectorAll('.edit-icon');
    
    uploadIcons.forEach(icon => icon.remove());
    editIcons.forEach(icon => icon.remove());
    
    // Ajouter temporairement le clone au document
    document.body.appendChild(clonedContainer);
    
    // Configurations pour html2canvas
    const options = {
      scale: 2, // Échelle plus élevée pour une meilleure qualité
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: clonedContainer.offsetWidth,
      height: clonedContainer.offsetHeight
    };
    
    // Afficher un message de chargement
    alert('Génération du PDF en cours...');
    
    html2canvas(clonedContainer, options).then((canvas) => {
      // Supprimer le clone après la capture
      document.body.removeChild(clonedContainer);
      
      const imgData = canvas.toDataURL('image/png');
      
      // Créer un PDF au format A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculer les dimensions pour ajuster à la page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculer le ratio pour s'assurer que l'image s'adapte à la page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 20) / imgHeight);
      
      // Centrer l'image sur la page
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('Annonce_Aid_El_Fitr.pdf');
    }).catch(error => {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
      
      // S'assurer que le clone est supprimé en cas d'erreur
      if (document.body.contains(clonedContainer)) {
        document.body.removeChild(clonedContainer);
      }
    });
  };

  // Style inline pour simuler le CSS
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    annonceContainer: {
      width: '100%',
      margin: '0 auto',
      padding: '30px',
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
      color: '#888'
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
    arabicInfoInput: {
      fontSize: '18px',
      color: '#16a085',
      textAlign: 'center',
      border: 'none',
      borderBottom: '2px solid #16a085',
      background: 'transparent',
      width: '100%',
      outline: 'none'
    },
    addressInput: {
      fontSize: '16px',
      color: '#555',
      textAlign: 'center',
      border: 'none',
      borderBottom: '2px solid #16a085',
      background: 'transparent',
      width: '100%',
      outline: 'none'
    },
    h1: {
      color: '#2c3e50',
      margin: '20px 0',
      fontSize: '28px'
    },
    h2: {
      color: '#16a085',
      margin: '20px 0 15px',
      fontSize: '24px',
      display: 'block',
      width: '100%'
    },
    info: {
      fontSize: '18px',
      margin: '15px 0',
      color: '#333',
      display: 'block'
    },
    arabicInfo: {
      fontSize: '18px',
      margin: '15px 0 20px',
      color: '#16a085',
      display: 'block',
      direction: 'rtl'
    },
    addressContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '25px 0 35px'
    },
    addressIcon: {
      color: '#2c3e50',
      marginRight: '8px'
    },
    address: {
      fontSize: '16px',
      color: '#555',
      fontStyle: 'normal'
    },
    programme: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '30px 0',
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
      padding: '12px',
      border: '1px solid #ddd'
    },
    trEven: {
      backgroundColor: '#f2f2f2'
    },
    important: {
      backgroundColor: '#fff3cd',
      color: '#856404',
      padding: '15px',
      margin: '25px 0',
      borderRadius: '5px',
      border: '1px solid #ffeeba'
    },
    note: {
      fontSize: '14px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '20px',
      paddingBottom: '10px'
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
    <div style={styles.container}>
      {/* Conteneur pour le contenu à imprimer */}
      <div ref={printContainerRef} style={styles.annonceContainer}>
        {/* Logo avec upload d'image */}
        <div style={styles.logoContainer} onClick={handleImageClick}>
          {imagePreview ? (
            <img src={imagePreview} alt="Logo mosquée" style={styles.logo} />
          ) : (
            <div style={styles.logo}>Logo Mosquée Niort</div>
          )}
          <div className="upload-icon" style={styles.uploadIcon}>
            <Upload size={16} />
          </div>
        </div>

        {/* Titre français modifiable */}
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
              <Edit2 size={16} className="edit-icon" style={styles.editIcon} />
            </h1>
          )}
        </div>

        {/* Titre arabe modifiable */}
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
              <Edit2 size={16} className="edit-icon" style={styles.editIcon} />
            </h2>
          )}
        </div>

        {/* Info française modifiable */}
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
              <Edit2 size={16} className="edit-icon" style={styles.editIcon} />
            </p>
          )}
        </div>
        
        {/* Info arabe modifiable */}
        <div style={styles.titleContainer} onClick={handleInfoArabicEdit}>
          {isEditingInfoArabic ? (
            <input
              type="text"
              value={infoArabic}
              onChange={(e) => setInfoArabic(e.target.value)}
              onKeyDown={handleInfoArabicSave}
              onBlur={() => setIsEditingInfoArabic(false)}
              style={styles.arabicInfoInput}
              autoFocus
              dir="rtl"
            />
          ) : (
            <p style={styles.arabicInfo}>
              <span dangerouslySetInnerHTML={{ __html: infoArabic }} />
              <Edit2 size={16} className="edit-icon" style={styles.editIcon} />
            </p>
          )}
        </div>
        
        {/* Adresse modifiable avec icône */}
        <div style={styles.addressContainer}>
          <MapPin size={20} style={styles.addressIcon} className="address-icon" />
          <div style={styles.titleContainer} onClick={handleAddressEdit}>
            {isEditingAddress ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={handleAddressSave}
                onBlur={() => setIsEditingAddress(false)}
                style={styles.addressInput}
                autoFocus
              />
            ) : (
              <address style={styles.address}>
                {address}
                <Edit2 size={16} className="edit-icon" style={{...styles.editIcon, top: '50%'}} />
              </address>
            )}
          </div>
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
          <p>⚠️ <strong>القيام بالوضوء في المنزل</strong></p>
        </div>

        <p style={styles.note}>* Le jour de l'Aïd el-Fitr sera le dimanche 30 mars ou 31 mars</p>
      </div>
      
      {/* Bouton de téléchargement - en dehors du conteneur d'impression */}
      <button 
        style={styles.downloadBtn} 
        onClick={handleDownloadPDF}
      >
        <Download size={18} />
        Télécharger en PDF
      </button>
      
      {/* Input file caché - en dehors du conteneur d'impression */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={styles.fileInput} 
        onChange={handleImageChange} 
        accept="image/*" 
      />
    </div>
  );
};

export default AnnonceAID;