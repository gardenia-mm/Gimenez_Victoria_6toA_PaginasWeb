crearFormulario({
  contenedor: "formulario-contenedor",
  id: "formularioConsulta",
  textoBoton: "Enviar",
  archivoCSV: "consultas-gimnasio.csv",
  campos: [
    { tipo: "text",   id: "nombre",   etiqueta: "Nombre",   requerido: true },
    { tipo: "email",  id: "email",    etiqueta: "Email",    requerido: true },
    { tipo: "tel",    id: "telefono", etiqueta: "Teléfono", requerido: false },
    { tipo: "select", id: "clase",    etiqueta: "Clase de interés", requerido: true,
      opciones: ["Musculación", "CrossFit", "Pilates", "Yoga", "Boxeo recreativo", "Spinning"] }
  ]
});
