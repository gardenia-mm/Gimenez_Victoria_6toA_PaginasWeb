function crearFormulario(config) {

  const contenedor = document.getElementById(config.contenedor);
  if (!contenedor) {
    console.error("No se encontró el contenedor #" + config.contenedor);
    return;
  }

  const formulario = document.createElement("form");
  formulario.id = config.id;
  formulario.noValidate = true;

  config.campos.forEach(function (campo) {
    const etiqueta = document.createElement("label");
    etiqueta.htmlFor = campo.id;
    etiqueta.textContent = campo.etiqueta;

    let entrada;

    if (campo.tipo === "select") {
      entrada = document.createElement("select");

      const guia = document.createElement("option");
      guia.value = "";
      guia.textContent = "Elegí una opción";
      guia.disabled = true;
      guia.selected = true;
      entrada.appendChild(guia);

      campo.opciones.forEach(function (texto) {
        const opcion = document.createElement("option");
        opcion.value = texto;
        opcion.textContent = texto;
        entrada.appendChild(opcion);
      });

    } else if (campo.tipo === "textarea") {
      entrada = document.createElement("textarea");
      entrada.rows = campo.filas || 4;

    } else {
      entrada = document.createElement("input");
      entrada.type = campo.tipo;   
    }

    entrada.id = campo.id;
    entrada.name = campo.id;
    if (campo.requerido) entrada.required = true;
    if (campo.min !== undefined) entrada.min = campo.min;
    if (campo.max !== undefined) entrada.max = campo.max;

    formulario.appendChild(etiqueta);
    formulario.appendChild(entrada);
  });

  const cajaTerminos = document.createElement("div");
  cajaTerminos.className = "terminos";

  const casilla = document.createElement("input");
  casilla.type = "checkbox";
  casilla.id = "terminos";
  casilla.name = "terminos";
  casilla.required = true;

  const etiquetaTerminos = document.createElement("label");
  etiquetaTerminos.htmlFor = "terminos";
  etiquetaTerminos.textContent = "Acepto los términos y condiciones";

  cajaTerminos.appendChild(casilla);
  cajaTerminos.appendChild(etiquetaTerminos);
  formulario.appendChild(cajaTerminos);

  const boton = document.createElement("button");
  boton.type = "submit";
  boton.textContent = config.textoBoton;
  formulario.appendChild(boton);

  const mensaje = document.createElement("p");
  mensaje.className = "mensaje-form";
  mensaje.setAttribute("role", "status");
  formulario.appendChild(mensaje);

  contenedor.appendChild(formulario);

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje-form " + tipo;
  }

  function validar() {
    for (const campo of config.campos) {
      const elemento = document.getElementById(campo.id);
      const valor = elemento.value.trim();

      if (campo.requerido && valor === "") {
        return { campo: elemento, texto: 'Completá el campo "' + campo.etiqueta + '".' };
      }

      if (valor === "") continue;

      if (campo.tipo === "email") {
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoEmail.test(valor)) {
          return { campo: elemento, texto: "Ingresá un email válido (por ejemplo, nombre@correo.com)." };
        }
      }

      if (campo.tipo === "tel") {
        const formatoTelefono = /^[0-9+()\s-]{6,}$/;
        if (!formatoTelefono.test(valor)) {
          return { campo: elemento, texto: "Ingresá un teléfono válido (solo números, espacios y guiones)." };
        }
      }

      if (campo.tipo === "number") {
        const numero = Number(valor);
        if (isNaN(numero)) {
          return { campo: elemento, texto: '"' + campo.etiqueta + '" debe ser un número.' };
        }
        if (campo.min !== undefined && numero < campo.min) {
          return { campo: elemento, texto: '"' + campo.etiqueta + '" no puede ser menor que ' + campo.min + "." };
        }
        if (campo.max !== undefined && numero > campo.max) {
          return { campo: elemento, texto: '"' + campo.etiqueta + '" no puede ser mayor que ' + campo.max + "." };
        }
      }

      if (campo.tipo === "time") {
        if ((campo.min && valor < campo.min) || (campo.max && valor > campo.max)) {
          return {
            campo: elemento,
            texto: '"' + campo.etiqueta + '" debe estar entre las ' + campo.min + " y las " + campo.max + "."
          };
        }
      }
    }

    if (!casilla.checked) {
      return { campo: casilla, texto: "Tenés que aceptar los términos y condiciones." };
    }

    return null;
  }

  function protegerDato(dato) {
    return '"' + String(dato).replace(/"/g, '""') + '"';
  }

  function descargarCSV() {
    const encabezado = config.campos.map(function (campo) {
      return campo.etiqueta;
    }).join(",");

    const fila = config.campos.map(function (campo) {
      return protegerDato(document.getElementById(campo.id).value.trim());
    }).join(",");

    const contenido = encabezado + "\r\n" + fila + "\r\n";

    const archivo = new Blob(["\uFEFF" + contenido], { type: "text/csv;charset=utf-8;" });

    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = config.archivoCSV;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(enlace.href);
  }

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const error = validar();
    if (error) {
      mostrarMensaje(error.texto, "error");
      error.campo.focus();
      return;
    }

    descargarCSV();
    mostrarMensaje("Se generó el archivo " + config.archivoCSV, "ok");
    formulario.reset();
  });
}