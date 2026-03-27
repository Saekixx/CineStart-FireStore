import { getCines, getPeliculas } from "./firebase.js";

const cargar = async () => {
  const peliculas = await getPeliculas();
  const cines = await getCines();

  if (document.getElementById("list-peliculas")) mostrarPeliculas(peliculas);

  if (document.getElementById("detalle-pelicula"))
    mostrarDetallePelicula(peliculas);

  if (document.getElementById("list-cines")) mostrarCines(cines);

  if (document.getElementById("detalle-cine")) mostrarDetalleCine(cines);
};

const mostrarCines = (data) => {
  const html = data
    .map(
      (item) =>
        `<div class="contenido-cine">
      <img src="img/cine/${item.id}.1.jpg" width="227" height="170" loading="lazy" />
      <div class="datos-cine">
        <h4>${item.RazonSocial}</h4><br/>
        <span>${item.Direccion} - ${item.Distrito}<br/><br/>Teléfono: ${item.Telefonos} anexo 865</span>
      </div>
      <br/>
      <a href="cine.html?id=${item.id}">
        <img src="img/varios/ico-info2.png" width="150" height="40"/>
      </a>
    </div>`,
    )
    .join("");

  document.getElementById("list-cines").innerHTML = html;
};

const mostrarDetalleCine = (dataCines) => {
  // Obtener el ID del cine de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  // Buscar el cine con el ID correspondiente
  const cine = dataCines.find((item) => item.id === id);

  if (!cine.peliculas || !cine.tarifas) {
    document.getElementById("detalle-cine").innerHTML =
      "<h2>No se encontro información del cine...</h2>";
    return;
  }

  // Si no se encuentra el cine, mostrar un mensaje de error
  if (!cine) {
    document.getElementById("detalle-cine").innerHTML =
      "<h2>Cine no encontrado</h2>";
    return;
  }

  // Generar HTML de Tarifas
  let detalleTarifa = "";
  let bolfila = false;

  cine.tarifas.forEach((tarifa) => {
    const css = bolfila ? "fila" : "fila impar";
    detalleTarifa += `<div class="${css}">
    <div class="celda-titulo">${tarifa.DiasSemana}</div>
    <div class="celda">${tarifa.Precio}</div>
  </div>`;
    bolfila = !bolfila;
  });

  // Generar HTML de Cartelera de Peliculas
  let detallePelicula = "";
  cine.peliculas.forEach((peli) => {
    const css = bolfila ? "fila" : "fila impar";
    detallePelicula += `<div class="${css}">
				<div class="celda-titulo">${peli.Titulo}</div>
				<div class="celda">${peli.Horarios}</div>
  </div>`;
    bolfila = !bolfila;
  });

  // Generar HTML del detalle del cine
  document.getElementById("detalle-cine").innerHTML =
    `<h2>${cine.RazonSocial}</h2>
        <div class="cine-info">
          <div class="cine-info datos">
            <p>${cine.Direccion} - ${cine.Distrito}</p>
            <p>Teléfono: ${cine.Telefonos} anexo 865</p>
            <br />
            <div class="tabla">
              ${detalleTarifa}
            </div>
            <div class="aviso">
              <p>
                A partir del 1ro de julio de 2016, Cinestar Multicines realizará
                el cobro de la comisión de S/. 1.00 adicional al tarifario
                vigente, a los usuarios que compren sus entradas por el
                aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las
                Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur,
                Porteño, Tumbes y Tacna.
              </p>
            </div>
          </div>
          <img src="img/cine/${cine.id}.2.jpg" />
          <br /><br />
          <h4>
            Los horarios de cada función están sujetos a cambios sin previo
            aviso.
          </h4>
          <br />
          <div class="cine-info peliculas">
            <div class="tabla">
            <div class="fila">
              <div class="celda-cabecera">Películas</div>
              <div class="celda-cabecera">Horarios</div>
            </div>
              ${detallePelicula}
            </div>
          </div>
        </div>
        <div>
          <img
            style="float: left"
            src="img/cine/${cine.id}.3.jpg"
            alt="Imagen del cine"
          />
          <span class="tx_gris"
            >Precios de los juegos: desde S/1.00 en todos los Cine Star.<br />
            Horario de atención de juegos es de 12:00 m hasta las 10:30 pm.
            <br /><br />
            Visitános y diviértete con nosotros.
            <br /><br />
            <b>CINESTAR</b>, siempre pensando en tí.
          </span>
        </div>`;
};

const mostrarPeliculas = (data) => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const cine = data.filter((item) => item.idEstado === id);

  const html = cine
    .map(
      (item) =>
        `<div class="contenido-pelicula">
  			    <div class="datos-pelicula">
  			    <h2>${item.Titulo}</h2><br/>
  					<p>${item.Sinopsis}</p>
  					<br/>
              <div class="boton-pelicula">
                <a href="pelicula.html?id=${item.id}" >
                  <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                </a>
                </div>
                <div class="boton-pelicula">
                  <a href="https://www.youtube.com/v/${item.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                    <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                  </a>
                </div>
              </div>
              <img src="img/pelicula/${item.id}.jpg" width="160" height="226"/><br/><br/>
            </div>`,
    )
    .join("");

  document.getElementById("list-peliculas").innerHTML = html;
};

const mostrarDetallePelicula = (data) => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const pelicula = data.find((item) => item.id === id);

  const html = `<br/><h1>Cartelera</h1><br/>
        <div class="contenido-pelicula">
            <div class="datos-pelicula">
                <h2>${pelicula.Titulo}</h2>
                <p>${pelicula.Sinopsis}</p>
                <br/>
                <div class="tabla">
                    <div class="fila">
                        <div class="celda-titulo">Título Original :</div>
                        <div class="celda">${pelicula.Titulo}</div>
                    </div>
                    <div class="fila">
                        <div class="celda-titulo">Estreno :</div>
                        <div class="celda">${pelicula.FechaEstreno}</div>
                    </div>
                    <div class="fila">
                        <div class="celda-titulo">Género :</div>
                        <div class="celda">${pelicula.Generos}</div>
                    </div>
                    <div class="fila">
                        <div class="celda-titulo">Director :</div>
                        <div class="celda">${pelicula.Director}</div>
                    </div>
                    <div class="fila">
                        <div class="celda-titulo">Reparto :</div>
                        <div class="celda">${pelicula.Reparto}</div>
                    </div>
                </div>
            </div>
            <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"><br/><br/>
        </div>
        <div class="pelicula-video">
            <embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
        </div>`;

  document.getElementById("detalle-pelicula").innerHTML = html;
};

await cargar();
