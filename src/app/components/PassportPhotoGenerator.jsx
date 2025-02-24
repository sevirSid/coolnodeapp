"use client"

import React, {useState, useRef, useEffect} from 'react';

const PassportPhotoGenerator = () => {
    // États
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

// Fonction corrigée pour générer la photo d'identité
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

    // Calculer le ratio d'échelle pour ne pas couper la tête
    // Utilisez la taille totale du visage plus une marge pour que la tête ne soit pas coupée
    const scale = headHeight / (faceSize * 1.2); // Ajouter 20% de marge

    // Position du visage centrée horizontalement et décalée vers le bas
    // Modifiez cette valeur pour éviter que la tête ne soit coupée
    const destX = width / 2 - facePosition.x * scale;
    const destY = height * 0.6 - (facePosition.y - faceSize / 2) * scale; // Décaler vers le bas (0.6 au lieu de 0.45)

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
    // Génération de la photo d'identité - NOUVELLE IMPLEMENTATION
    // const generatePassportPhoto1 = () => {
    //     if (!image) return;

    //     // Dimensions de la photo finale
    //     let width, height;
    //     if (photoSize === 'custom') {
    //         width = customWidth * 10;  // mm à pixels
    //         height = customHeight * 10;
    //     } else {
    //         const [w, h] = photoSize.split('x');
    //         width = parseInt(w) * 10;
    //         height = parseInt(h) * 10;
    //     }

    //     // Créer un nouvel élément canvas temporaire
    //     const tempCanvas = document.createElement('canvas');
    //     tempCanvas.width = width;
    //     tempCanvas.height = height;
    //     const ctx = tempCanvas.getContext('2d');

    //     // Remplir avec la couleur d'arrière-plan
    //     ctx.fillStyle = backgroundColor;
    //     ctx.fillRect(0, 0, width, height);

    //     // Calculer le ratio tête/photo (standard = 70-80% de la hauteur)
    //     const headRatio = 0.75;
    //     const headHeight = height * headRatio;

    //     // Calculer le ratio d'échelle
    //     const scale = headHeight / faceSize;

    //     // Position du visage centrée horizontalement et à 45% du haut
    //     const destX = width / 2 - facePosition.x * scale;
    //     const destY = height * 0.45 - (facePosition.y - faceSize / 2) * scale;

    //     // Dessiner l'image
    //     ctx.drawImage(
    //         image,
    //         destX, destY,
    //         image.width * scale, image.height * scale
    //     );

    //     // Convertir le canvas en dataURL
    //     const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
    //     setResultImage(dataUrl);
    // };

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
