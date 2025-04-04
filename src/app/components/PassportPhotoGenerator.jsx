"use client"

import React, {useState, useRef, useEffect} from 'react';

const PassportPhotoGenerator = () => {
    // États existants
    const [image, setImage] = useState(null);
    const [facePosition, setFacePosition] = useState({x: 0, y: 0});
    const [faceSize, setFaceSize] = useState(200);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({x: 0, y: 0});
    const [isResizing, setIsResizing] = useState(false);
    const [activeHandle, setActiveHandle] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [guidelineColor, setGuidelineColor] = useState('#ff0000');
    const [photoSize, setPhotoSize] = useState('35x45');
    const [customWidth, setCustomWidth] = useState(35);
    const [customHeight, setCustomHeight] = useState(45);
    const [resultImage, setResultImage] = useState(null);
    {/* Ajoutez ces nouveaux états au début de votre composant */}
    const [removeShades, setRemoveShades] = useState(false);
    const [shadowThresholdValue, setShadowThresholdValue] = useState(30);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    
    // Nouveaux états pour les ajustements fins
    const [verticalPosition, setVerticalPosition] = useState(60); // Position verticale en pourcentage
    const [scaleFactor, setScaleFactor] = useState(120); // Facteur d'échelle en pourcentage (120 = 1.2)

    // Références
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    // Handles pour le redimensionnement
    const handles = [
        {position: 'top', cursor: 'ns-resize'},
        {position: 'bottom', cursor: 'ns-resize'}
    ];

    // Fonctions utilitaires
    const getHandlePosition = (handle) => {
        if (handle === 'top') {
            return {x: facePosition.x, y: facePosition.y - faceSize / 2};
        } else if (handle === 'bottom') {
            return {x: facePosition.x, y: facePosition.y + faceSize / 2};
        }
        return {x: 0, y: 0};
    };

    const isInHandle = (x, y, handle) => {
        const handlePos = getHandlePosition(handle);
        const distance = Math.sqrt(
            Math.pow(x - handlePos.x, 2) + Math.pow(y - handlePos.y, 2)
        );
        return distance <= 10; // taille du handle
    };

    // Gestion du téléchargement d'image
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    // Centre le guide sur l'image
                    setFacePosition({
                        x: img.width / 2,
                        y: img.height / 2
                    });
                    drawCanvas();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    // Fonction pour dessiner sur le canvas
    const drawCanvas = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        // Dessiner l'image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);

        // Calque semi-transparent pour mettre en évidence la zone du visage
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner l'ovale pour le visage
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(
            facePosition.x,
            facePosition.y,
            faceSize / 2.5, // Largeur
            faceSize / 2,   // Hauteur (plus grande pour un visage)
            0,
            0,
            2 * Math.PI
        );
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.restore();

        // Dessiner le contour de l'ovale
        ctx.beginPath();
        ctx.ellipse(
            facePosition.x,
            facePosition.y,
            faceSize / 2.5,
            faceSize / 2,
            0,
            0,
            2 * Math.PI
        );
        ctx.strokeStyle = guidelineColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Lignes de repère pour le haut de la tête et le menton
        ctx.beginPath();
        ctx.moveTo(facePosition.x - faceSize / 2, facePosition.y - faceSize / 2);
        ctx.lineTo(facePosition.x + faceSize / 2, facePosition.y - faceSize / 2);
        ctx.strokeStyle = guidelineColor;
        ctx.setLineDash([5, 5]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(facePosition.x - faceSize / 2, facePosition.y + faceSize / 2);
        ctx.lineTo(facePosition.x + faceSize / 2, facePosition.y + faceSize / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dessiner les poignées
        handles.forEach(handle => {
            const pos = getHandlePosition(handle.position);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Texte d'indication
        ctx.font = '16px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';

        // Haut de la tête
        ctx.fillText('Haut de la tête', facePosition.x, facePosition.y - faceSize / 2 - 15);

        // Menton
        ctx.fillText('Menton', facePosition.x, facePosition.y + faceSize / 2 + 25);
    };

    // Gestion des événements souris
    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
        const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

        // Vérifier si on clique sur une poignée
        for (const handle of handles) {
            if (isInHandle(x, y, handle.position)) {
                setIsResizing(true);
                setActiveHandle(handle.position);
                return;
            }
        }

        // Vérifier si on clique dans l'ovale du visage
        const dx = x - facePosition.x;
        const dy = y - facePosition.y;
        const ellipseWidth = faceSize / 2.5;
        const ellipseHeight = faceSize / 2;

        // Calcul du point sur l'ellipse
        const normalizedDistance = Math.sqrt((dx / ellipseWidth) ** 2 + (dy / ellipseHeight) ** 2);

        if (normalizedDistance <= 1) {
            setIsDragging(true);
            setDragStartPos({x: x - facePosition.x, y: y - facePosition.y});
        }
    };

    const handleMouseMove = (e) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
        const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

        // Mise à jour du curseur
        for (const handle of handles) {
            if (isInHandle(x, y, handle.position)) {
                canvasRef.current.style.cursor = handle.cursor;
                return;
            }
        }

        // Vérifier si la souris est sur l'ovale du visage
        const dx = x - facePosition.x;
        const dy = y - facePosition.y;
        const distance = Math.sqrt((dx / 2.5) ** 2 + (dy / 2) ** 2);

        if (distance <= faceSize / 4) {
            canvasRef.current.style.cursor = 'move';
        } else {
            canvasRef.current.style.cursor = 'default';
        }

        // Gestion du redimensionnement
        if (isResizing && activeHandle) {
            if (activeHandle === 'top') {
                const newSize = (facePosition.y + faceSize / 2 - y) * 2;
                if (newSize >= 100 && newSize <= 800) {
                    setFaceSize(newSize);

                    // Ajuster la position pour maintenir le menton en place
                    const newY = y + newSize / 2;
                    setFacePosition(prev => ({
                        ...prev,
                        y: newY
                    }));
                }
            } else if (activeHandle === 'bottom') {
                const newSize = (y - (facePosition.y - faceSize / 2)) * 2;
                if (newSize >= 100 && newSize <= 800) {
                    setFaceSize(newSize);

                    // Ajuster la position pour maintenir le haut de la tête en place
                    const newY = facePosition.y - faceSize / 2 + newSize / 2;
                    setFacePosition(prev => ({
                        ...prev,
                        y: newY
                    }));
                }
            }
        }

        // Gestion du déplacement
        if (isDragging) {
            setFacePosition({
                x: x - dragStartPos.x,
                y: y - dragStartPos.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setActiveHandle(null);
    };

    // Fonction améliorée pour générer la photo d'identité avec fond correctement appliqué
const generatePassportPhoto = () => {
    if (!image) return;

    // Dimensions de la photo finale
    let width, height;
    if (photoSize === 'custom') {
        width = customWidth * 10;  // mm à pixels
        height = customHeight * 10;
    } else {
        const [w, h] = photoSize.split('x');
        width = parseInt(w) * 10;
        height = parseInt(h) * 10;
    }

    // Créer le canvas temporaire à la taille finale
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext('2d');

    // Remplir tout le canvas avec la couleur d'arrière-plan
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Calculer la taille que devrait avoir la tête
    const headRatio = 0.75;  // Standard: la tête fait 70-80% de la hauteur
    const headHeight = height * headRatio;

    // Calculer le facteur d'échelle en fonction du curseur de zoom
    // et de la taille du visage identifiée
    const scale = headHeight / (faceSize * (scaleFactor / 100));

    // Position verticale basée sur le curseur
    const verticalPositionPercent = verticalPosition / 100;

    // Calculer la position de l'image originale sur le canvas
    const destX = width / 2 - facePosition.x * scale;
    const destY = height * verticalPositionPercent - (facePosition.y - faceSize / 2) * scale;

    // Dessiner l'image source sur le canvas avec arrière-plan
    ctx.drawImage(
        image,
        destX, destY,
        image.width * scale, image.height * scale
    );

    // Option pour traiter les ombres (suppression de base)
    if (removeShades) {
        try {
            // Obtenir les données d'image
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            
            // Paramètres pour la détection d'ombres
            const shadowThreshold = shadowThresholdValue; // Valeur de seuil ajustable
            const backgroundColorRGB = hexToRgb(backgroundColor);
            
            for (let i = 0; i < data.length; i += 4) {
                // Calculer la luminosité du pixel
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Différence de luminosité avec l'arrière-plan
                const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
                const bgLuminance = 0.299 * backgroundColorRGB.r + 0.587 * backgroundColorRGB.g + 0.114 * backgroundColorRGB.b;
                
                // Si le pixel est sombre (ombre potentielle)
                if (Math.abs(luminance - bgLuminance) < shadowThreshold) {
                    data[i] = backgroundColorRGB.r;
                    data[i + 1] = backgroundColorRGB.g;
                    data[i + 2] = backgroundColorRGB.b;
                }
            }
            
            // Appliquer les modifications
            ctx.putImageData(imageData, 0, 0);
        } catch (e) {
            console.error("Erreur lors du traitement des ombres:", e);
        }
    }

    // Convertir le canvas en dataURL
    const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
    setResultImage(dataUrl);
};

// Fonction utilitaire pour convertir une couleur hexadécimale en RGB
const hexToRgb = (hex) => {
    // Supprimer le # si présent
    hex = hex.replace(/^#/, '');
    
    // Convertir en valeurs RGB
    let bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return { r, g, b };
};
    // Génération de la photo d'identité
    const generatePassportPhoto1 = () => {
        if (!image) return;

        // Dimensions de la photo finale
        let width, height;
        if (photoSize === 'custom') {
            width = customWidth * 10;  // mm à pixels
            height = customHeight * 10;
        } else {
            const [w, h] = photoSize.split('x');
            width = parseInt(w) * 10;
            height = parseInt(h) * 10;
        }

        // Créer un nouvel élément canvas temporaire
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const ctx = tempCanvas.getContext('2d');

        // Remplir avec la couleur d'arrière-plan
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        // Calculer le ratio tête/photo (standard = 70-80% de la hauteur)
        const headRatio = 0.75;
        const headHeight = height * headRatio;

        // Utiliser les valeurs des sliders pour le positionnement
        const scale = headHeight / (faceSize * (scaleFactor / 100));
        const verticalPositionPercent = verticalPosition / 100;

        // Position du visage centrée horizontalement et avec position verticale ajustable
        const destX = width / 2 - facePosition.x * scale;
        const destY = height * verticalPositionPercent - (facePosition.y - faceSize / 2) * scale;

        // Dessiner l'image
        ctx.drawImage(
            image,
            destX, destY,
            image.width * scale, image.height * scale
        );

        // Convertir le canvas en dataURL
        const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
        setResultImage(dataUrl);
    };

    // Fonction pour générer une prévisualisation en temps réel
    const generatePreview = () => {
        if (!image || !resultImage) return;
        
        // Générer une nouvelle photo avec les paramètres actuels
        generatePassportPhoto();
    };

    // Mise à jour de la prévisualisation lorsque les paramètres changent
    useEffect(() => {
        if (resultImage) {
            generatePassportPhoto();
        }
    }, [verticalPosition, scaleFactor]);

    // Téléchargement de l'image générée
    const downloadImage = () => {
        if (!resultImage) return;

        const link = document.createElement('a');
        link.href = resultImage;
        link.download = 'photo-identite.jpg';
        link.click();
    };

    // Mise à jour du canvas quand les états changent
    useEffect(() => {
        drawCanvas();
    }, [image, facePosition, faceSize, guidelineColor]);

    // Taille adaptative pour l'aperçu
    const getPreviewStyle = () => {
        if (!image) return {maxWidth: '100%', maxHeight: '500px'};

        const containerWidth = containerRef.current?.clientWidth || 500;
        const ratio = image.width / image.height;

        if (image.width > containerWidth) {
            return {width: containerWidth, height: containerWidth / ratio};
        }

        return {width: image.width, height: image.height};
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Générateur de Photo d'Identité</h1>

            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Panneau de gauche - Contrôles */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <div className="mb-4">
                            <label className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Choisir une photo
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>

                        {image && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Couleur des repères</label>
                                    <input
                                        type="color"
                                        value={guidelineColor}
                                        onChange={(e) => setGuidelineColor(e.target.value)}
                                        className="w-full h-10 rounded border"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Couleur d'arrière-plan</label>
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        className="w-full h-10 rounded border"
                                    />
                                </div>

                                {/* Ajoutez ces contrôles sous le choix de la couleur d'arrière-plan */}
                                <div className="mb-4">
                                    <button 
                                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded flex justify-between items-center"
                                    >
                                        Options avancées
                                        <span>{showAdvancedOptions ? '▲' : '▼'}</span>
                                    </button>
                                    
                                    {showAdvancedOptions && (
                                        <div className="mt-2 p-3 border rounded bg-gray-50">
                                            <div className="mb-3">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="removeShades"
                                                        checked={removeShades}
                                                        onChange={(e) => setRemoveShades(e.target.checked)}
                                                        className="mr-2 h-4 w-4"
                                                    />
                                                    <label htmlFor="removeShades" className="text-sm font-medium">
                                                        Supprimer les ombres
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Tente de détecter et supprimer les ombres sur l'arrière-plan
                                                </p>
                                            </div>
                                            
                                            {removeShades && (
                                                <div className="mb-2">
                                                    <label className="block text-sm font-medium mb-1">
                                                        Sensibilité de détection ({shadowThresholdValue})
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="10"
                                                        max="100"
                                                        value={shadowThresholdValue}
                                                        onChange={(e) => setShadowThresholdValue(parseInt(e.target.value))}
                                                        className="w-full"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Valeur plus élevée = plus de pixels considérés comme ombres
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <div className="mb-2">
                                                <button
                                                    onClick={() => {
                                                        setBackgroundColor('#FFFFFF'); // Blanc
                                                        setShadowThresholdValue(30);
                                                    }}
                                                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium py-1 px-2 rounded mr-2"
                                                >
                                                    Photo standard
                                                </button>
                                                
                                                <button
                                                    onClick={() => {
                                                        setBackgroundColor('#B3D9F1'); // Bleu clair
                                                        setShadowThresholdValue(45);
                                                    }}
                                                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium py-1 px-2 rounded"
                                                >
                                                    Visa US
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Format de photo</label>
                                    <select
                                        value={photoSize}
                                        onChange={(e) => setPhotoSize(e.target.value)}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="35x45">3,5 × 4,5 cm (Standard Passeport/CNI)</option>
                                        <option value="3x4">3 × 4 cm</option>
                                        <option value="5x5">5 × 5 cm (Carré)</option>
                                        <option value="custom">Format personnalisé</option>
                                    </select>
                                </div>

                                {photoSize === 'custom' && (
                                    <div className="mb-4 flex gap-2">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium mb-1">Largeur (mm)</label>
                                            <input
                                                type="number"
                                                value={customWidth}
                                                onChange={(e) => setCustomWidth(parseInt(e.target.value) || 35)}
                                                min="20"
                                                max="100"
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium mb-1">Hauteur (mm)</label>
                                            <input
                                                type="number"
                                                value={customHeight}
                                                onChange={(e) => setCustomHeight(parseInt(e.target.value) || 45)}
                                                min="20"
                                                max="100"
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <button
                                        onClick={generatePassportPhoto}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Générer la photo
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Panneau de droite - Prévisualisation */}
                    <div className="w-full lg:w-2/3" ref={containerRef}>
                        {!image ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-64 flex items-center justify-center">
                                <p className="text-gray-500">
                                    Téléchargez une photo pour commencer l'édition
                                </p>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mb-2">Positionnez les repères sur votre visage</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Ajustez l'ovale pour délimiter votre visage en utilisant les poignées.
                                    Alignez la ligne supérieure avec le haut de votre tête et la ligne inférieure avec votre menton.
                                </p>
                                <div className="relative" style={getPreviewStyle()}>
                                    <canvas
                                        ref={canvasRef}
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                        className="max-w-full"
                                        style={{cursor: 'default'}}
                                    />
                                </div>
                            </div>
                        )}

                        {resultImage && (
                            <div className="mt-6 p-4 border rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Photo générée</h3>
                                
                                {/* Nouveaux contrôles d'ajustement */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Position verticale ({verticalPosition}%)
                                    </label>
                                    <input
                                        type="range"
                                        min="40"
                                        max="80"
                                        value={verticalPosition}
                                        onChange={(e) => setVerticalPosition(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Ajustez pour éviter que la tête ne soit coupée
                                    </p>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Zoom ({(scaleFactor/100).toFixed(2)}x)
                                    </label>
                                    <input
                                        type="range"
                                        min="100"
                                        max="150"
                                        value={scaleFactor}
                                        onChange={(e) => setScaleFactor(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Ajustez pour modifier la taille du visage dans la photo
                                    </p>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                    <img
                                        src={resultImage}
                                        alt="Photo d'identité générée"
                                        className="max-w-full max-h-80 mb-4 border"
                                    />
                                    <button
                                        onClick={downloadImage}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Télécharger la photo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 text-sm text-gray-600 max-w-4xl text-center">
                <p>
                    Ce générateur crée des photos d'identité avec des repères précis pour le visage.
                    Suivez les normes officielles : le visage doit occuper 70-80% de la hauteur de l'image,
                    la tête doit être centrée, et l'expression doit être neutre.
                </p>
            </div>
        </div>
    );
};

export default PassportPhotoGenerator;
