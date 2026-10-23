crearFormulario({
  contenedor: "formulario-contenedor",
  id: "formularioReserva",
  textoBoton: "Reservar",
  archivoCSV: "reservas.csv",
  campos: [
    { tipo: "text",     id: "nombre",     etiqueta: "Nombre",                 requerido: true },
    { tipo: "email",    id: "email",      etiqueta: "Email",                  requerido: true },
    { tipo: "number",   id: "personas",   etiqueta: "Cantidad de personas",   requerido: true, min: 1, max: 15 },
    { tipo: "time",     id: "horario",    etiqueta: "Horario de la reserva",  requerido: true, min: "08:00", max: "20:00" },
    { tipo: "textarea", id: "comentario", etiqueta: "Comentario",             requerido: false, filas: 4 }
  ]
});
