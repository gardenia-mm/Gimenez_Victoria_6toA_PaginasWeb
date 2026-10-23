crearFormulario({
  contenedor: "formulario-contenedor",
  id: "formularioProducto",
  textoBoton: "Enviar consulta",
  archivoCSV: "consultas-tecnostore.csv",
  campos: [
    { tipo: "text",     id: "nombre",   etiqueta: "Nombre",   requerido: true },
    { tipo: "text",     id: "apellido", etiqueta: "Apellido", requerido: true },
    { tipo: "email",    id: "email",    etiqueta: "Email",    requerido: true },
    { tipo: "select",   id: "producto", etiqueta: "Producto de interés", requerido: true,
      opciones: ["Notebook", "Celular", "Auriculares", "Teclado"] },
    { tipo: "textarea", id: "mensaje",  etiqueta: "Mensaje",  requerido: false, filas: 4 }
  ]
});
