// import React, { useState } from "react";

// const ImageUpload = ({
//     id,
//     label,
//     setValue,
//     onProcess,
//     error,
//     required = false,
// }) => {
//     const [preview, setPreview] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [localError, setLocalError] = useState(null);

//     const handleChange = async (e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         setPreview(URL.createObjectURL(file));
//         setValue(file);
//         setLocalError(null);
//         setResult(null);
//         setLoading(true);

//         try {
//             if (onProcess) {
//                 const output = await onProcess(file);
//                 setResult(output);
//             }
//         } catch (err) {
//             console.error(err);
//             setLocalError("Error al procesar la imagen");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="mb-3">
//             <label htmlFor={id} className="form-label">
//                 {label}
//                 {required && <span className="text-danger"> *</span>}
//             </label>

//             <input
//                 id={id}
//                 type="file"
//                 className={`form-control ${error || localError ? "is-invalid" : ""}`}
//                 accept="image/*"
//                 onChange={handleChange}
//                 required={required}
//             />

//             {preview && (
//                 <div className="mt-2">
//                     <img
//                         src={preview}
//                         alt="preview"
//                         style={{
//                             maxWidth: "250px",
//                             borderRadius: "8px",
//                             border: "1px solid #ccc",
//                         }}
//                     />
//                 </div>
//             )}

//             {loading && <div className="text-muted mt-2">Procesando...</div>}
//             {error || localError ? (
//                 <div className="invalid-feedback d-block">
//                     {error || localError}
//                 </div>
//             ) : result ? (
//                 <div className="mt-2 alert alert-success">
//                     <strong>Resultado:</strong> {JSON.stringify(result)}
//                 </div>
//             ) : null}
//         </div>
//     );
// };

// export default ImageUpload;
