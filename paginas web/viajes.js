crearFormulario({
  contenedor: "formulario-contenedor",
  id: "formularioViaje",
  textoBoton: "Enviar consulta",
  archivoCSV: "consultas-viajes.csv",
  campos: [
    { tipo: "text",     id: "nombre",   etiqueta: "Nombre",   requerido: true },
    { tipo: "text",     id: "apellido", etiqueta: "Apellido", requerido: true },
    { tipo: "email",    id: "email",    etiqueta: "Email",    requerido: true },
    { tipo: "select",   id: "destino",  etiqueta: "Destino",  requerido: true,
      opciones: ["Japón", "Alemania", "República Checa", "Austria", "Colombia", "India"] },
    { tipo: "textarea", id: "mensaje",  etiqueta: "Mensaje",  requerido: false, filas: 4 }
  ]
});
