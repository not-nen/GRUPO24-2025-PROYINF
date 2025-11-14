import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const About = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [procesando, setProcesando] = useState(false);
  const [tipo, setTipo] = useState("nuevo");
  
  // Estados para el recorte manual
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [originalImageSize, setOriginalImageSize] = useState({ width: 1000, height: 600 });
  const [usarRecorte, setUsarRecorte] = useState(false);

  // 📏 Redimensionar imagen manteniendo aspecto a 1000x600
  const resizeImage = (file, targetWidth = 1000, targetHeight = 600) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        
        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        resolve({
          dataUrl: canvas.toDataURL("image/png"),
          width: targetWidth,
          height: targetHeight
        });
      };
      img.src = URL.createObjectURL(file);
    });

  // 📍 Zonas para cada tipo de carnet (coordenadas para 1000x600)
  const zonasViejo = [
    { nombre: "Nombre", left: 340, top: 75, width: 470, height: 150 },
    { nombre: "Datos 1", left: 340, top: 220, width: 220, height: 190 },
    { nombre: "Zona 2", left: 560, top: 220, width: 240, height: 190 },
    { nombre: "Rut", left: 100, top: 490, width: 220, height: 100 },
  ];

  const zonasNuevo = [
    { nombre: "Nombre", left: 290, top: 75, width: 500, height: 180 },
    { nombre: "Datos 1", left: 290, top: 240, width: 230, height: 210 },
    { nombre: "Zona 2", left: 640, top: 240, width: 260, height: 210 },
    { nombre: "Rut", left: 0, top: 490, width: 290, height: 100 },
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Redimensionar a 1000x600 para estandarizar
    const { dataUrl, width, height } = await resizeImage(file, 1000, 600);
    setImageUrl(dataUrl);
    setOriginalImageSize({ width, height });
    setCroppedImage(null);
    setResultados([]);
    setSelection({ startX: 0, startY: 0, endX: 0, endY: 0 });
    setUsarRecorte(false);
  };

  // 🖱️ Funciones para el recorte manual
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calcular escala entre el canvas visual y el tamaño real
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    setIsSelecting(true);
    setSelection({
      startX: pos.x,
      startY: pos.y,
      endX: pos.x,
      endY: pos.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isSelecting) return;
    
    const pos = getMousePos(e);
    setSelection(prev => ({
      ...prev,
      endX: pos.x,
      endY: pos.y
    }));
    
    drawSelection();
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const drawSelection = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    
    // Redibujar la imagen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dibujar el rectángulo de selección
    const { startX, startY, endX, endY } = selection;
    const width = endX - startX;
    const height = endY - startY;
    
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(startX, startY, width, height);
    
    ctx.setLineDash([]);
  };

  // 🔄 Redimensionar imagen recortada a 1000x600
  const resizeCroppedImage = (imageDataUrl) => 
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 600;
        const ctx = canvas.getContext("2d");
        
        // Dibujar la imagen recortada redimensionada a 1000x600
        ctx.drawImage(img, 0, 0, 1000, 600);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = imageDataUrl;
    });

  const confirmarRecorte = async () => {
    const canvas = canvasRef.current;
    const { startX, startY, endX, endY } = selection;
    
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    
    if (width === 0 || height === 0) {
      alert("Por favor, selecciona un área válida para recortar");
      return;
    }
    
    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");
    
    cropCanvas.width = width;
    cropCanvas.height = height;
    
    cropCtx.drawImage(
      canvas,
      x, y, width, height,
      0, 0, width, height
    );
    
    const cropped = cropCanvas.toDataURL("image/png");
    
    // 🔄 Redimensionar la imagen recortada a 1000x600
    const resizedCroppedImage = await resizeCroppedImage(cropped);
    setCroppedImage(resizedCroppedImage);
    setUsarRecorte(true);
  };

  const usarImagenCompleta = () => {
    setUsarRecorte(false);
    setCroppedImage(null);
  };

  const leerZonas = async () => {
    // Usar imagen recortada o imagen completa según la selección
    const source = usarRecorte ? croppedImage : imageUrl;
    if (!source) return;
    setProcesando(true);

    const zonas = tipo === "nuevo" ? zonasNuevo : zonasViejo;
    const nuevasLecturas = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    for (const zona of zonas) {
      const { left, top, width, height } = zona;
      canvas.width = width;
      canvas.height = height;

      const image = new Image();
      image.src = source;
      await image.decode();
      
      // Asegurar que usamos las coordenadas correctas para la imagen de 1000x600
      ctx.drawImage(image, left, top, width, height, 0, 0, width, height);

      const cropped = canvas.toDataURL("image/png");
      const { data } = await Tesseract.recognize(cropped, "spa");
      nuevasLecturas.push({ titulo: zona.nombre, texto: data.text.trim() });
    }

    setResultados(nuevasLecturas);
    setProcesando(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔍 OCR por tipo de carnet</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      <br />

      {/* 🔘 Selector manual de tipo */}
      <label>
        <input
          type="radio"
          value="viejo"
          checked={tipo === "viejo"}
          onChange={(e) => setTipo(e.target.value)}
        />
        Carnet viejo
      </label>
      <label style={{ marginLeft: 10 }}>
        <input
          type="radio"
          value="nuevo"
          checked={tipo === "nuevo"}
          onChange={(e) => setTipo(e.target.value)}
        />
        Carnet nuevo
      </label>

      <br />
      <br />

      {/* 🎯 Selector de modo (recortar o usar imagen completa) */}
      {imageUrl && (
        <div style={{ marginBottom: 20 }}>
          <label>
            <input
              type="radio"
              checked={!usarRecorte}
              onChange={usarImagenCompleta}
            />
            Usar imagen completa
          </label>
          <label style={{ marginLeft: 15 }}>
            <input
              type="radio"
              checked={usarRecorte}
              onChange={() => setUsarRecorte(true)}
            />
            Recortar área manualmente
          </label>
        </div>
      )}

      {/* 🖼️ Recorte MANUAL con canvas (solo si se selecciona recortar) */}
      {imageUrl && usarRecorte && !croppedImage && (
        <div style={{ marginTop: 20 }}>
          <h4>🎯 Selecciona el área a recortar (arrastra el mouse)</h4>
          <p style={{ fontSize: "12px", color: "#666" }}>
            💡 La imagen se redimensionará automáticamente a 1000x600px después del recorte
          </p>
          <div style={{ position: "relative", display: "inline-block" }}>
            <canvas
              ref={canvasRef}
              width={originalImageSize.width}
              height={originalImageSize.height}
              style={{ 
                border: "2px solid #ccc", 
                cursor: "crosshair",
                width: "600px",
                height: "auto"
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Original"
              style={{ display: "none" }}
              onLoad={() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                const img = imgRef.current;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              }}
            />
          </div>
          <br />
          <button onClick={confirmarRecorte} style={{ marginTop: 10 }}>
            ✂️ Confirmar recorte seleccionado
          </button>
        </div>
      )}

      {/* Vista previa de imagen (recortada o completa) */}
      {(imageUrl && !usarRecorte) || croppedImage ? (
        <div style={{ marginTop: 20 }}>
          <h4>📸 {usarRecorte ? "Imagen recortada lista" : "Imagen completa lista"}</h4>
          <img 
            src={usarRecorte ? croppedImage : imageUrl} 
            alt={usarRecorte ? "Recortada" : "Completa"} 
            style={{ 
              maxWidth: "600px", 
              border: "1px solid #ccc",
              marginBottom: "10px"
            }} 
          />
          <br />
          
          {/* Mostrar zonas OCR en la imagen */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={usarRecorte ? croppedImage : imageUrl}
              alt="preview con zonas"
              style={{ width: "600px", border: "1px solid #ccc" }}
            />
            {(tipo === "nuevo" ? zonasNuevo : zonasViejo).map((zona, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${(zona.left / 1000) * 100}%`,
                  top: `${(zona.top / 600) * 100}%`,
                  width: `${(zona.width / 1000) * 100}%`,
                  height: `${(zona.height / 600) * 100}%`,
                  border: "2px dashed red",
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* Botón para procesar OCR */}
      {imageUrl && (
        <button 
          onClick={leerZonas} 
          disabled={procesando || (usarRecorte && !croppedImage)}
          style={{ marginTop: 10 }}
        >
          {procesando ? "Procesando..." : "🧠 Leer zonas OCR"}
        </button>
      )}

      {/* Resultados del OCR */}
      <div style={{ marginTop: 20 }}>
        {resultados.map((r, i) => (
          <div key={i} style={{ marginTop: 10 }}>
            <strong>{r.titulo}</strong>
            <pre style={{ background: "#f4f4f4", padding: 10 }}>{r.texto}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;