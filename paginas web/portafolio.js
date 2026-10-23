crearFormulario({
  contenedor: "formulario-contenedor",
  id: "formularioProducto",
  textoBoton: "Enviar consulta",
  archivoCSV: "consultas-tecnostore.csv",
  campos: [
    { tipo: "text",     id: "nombre",   etiqueta: "Nombre",   requerido: true },
    { tipo: "email",    id: "email",    etiqueta: "Email",    requerido: true },
    { tipo: "select",   id: "servicio", etiqueta: "Servicio de interés", requerido: true,
      opciones: ["Diseño de página web", "Desarrollo de aplicación", "Creación de videojuego"] },
    { tipo: "textarea", id: "mensaje",  etiqueta: "Mensaje",  requerido: false, filas: 4 }
  ]
});