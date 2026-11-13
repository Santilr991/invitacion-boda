# Invitación de boda — Bleidys & Miguel

Invitación digital hecha con HTML, CSS y JavaScript puros (sin frameworks ni build tools).
Incluye sobre 3D de apertura, cuenta regresiva, galería con lightbox, ubicaciones y formulario de reserva.

## Cómo verla

Abre `index.html` con doble clic en tu navegador. Todo funciona sin servidor.
Las tipografías se cargan desde Google Fonts, así que necesitas internet; si no hay conexión,
el navegador usará fuentes serif/sans de respaldo y la página seguirá funcionando.

Vista previa rápida sin pasar por el sobre (útil para editar):

- `index.html?autoopen=1` → abre directo la invitación.
- `index.html?autoopen=1&scroll=galeria` → abre y baja a una sección (`galeria`, `evento`, `reserva`, etc.).

## Estructura

```
invitacion-boda/
├── index.html              Estructura y textos de las secciones
├── css/styles.css          Paleta, animaciones y diseño responsive
├── js/app.js               Datos de la boda + lógica de la página
├── assets/
│   ├── canva/              Archivos originales compartidos (no se cargan)
│   └── images/
│       ├── canva/          Elementos adaptados a la paleta
│       └── *.svg           Imágenes placeholder
└── README.md
```

## Dónde editar cada cosa

### 1. Datos de la boda — `js/app.js`

Al inicio del archivo está el objeto `CONFIG`. Cambia ahí:

- `bride`, `groom`, `lastNames`, `fullNames`: nombres.
- `dateISO`: fecha y hora en formato `"AAAA-MM-DDTHH:MM:SS"`. La cuenta regresiva, el día de la semana
  y el mes se calculan automáticamente a partir de esta fecha.
- `timeLabel`: hora que se muestra en los textos.
- `quote`: frase del hero.
- `ceremony` y `reception`: nombre, hora, dirección y URL de Google Maps. El mapa embebido usa el
  parámetro `query` de esa URL o, si no existe, la dirección; el botón “Abrir en Google Maps” usa la URL completa.
- `rsvpDeadline`: fecha límite de confirmación (se muestra en la sección de reserva).
- `maxGuests`: cupo máximo de personas por invitación en el formulario de reserva (por defecto 10).

> Si cambias la fecha, no hace falta tocar el HTML: la hora, el día y el año se actualizan solos.

### 2. Textos — `index.html`

Los párrafos de la historia, el itinerario y las notas están directamente en el HTML.
Busca las secciones `id="historia"`, `id="evento"`, `id="regalos"` (lluvia de sobres) e `id="reserva"`.

### 3. Fotos — `assets/images/`

Ahora son SVG de ejemplo con el monograma. Para usar fotos reales:

1. Guarda tus fotos en `assets/images/` (idealmente JPG/WebP optimizados, ~1200 px de ancho).
2. Actualiza el atributo `src` en `index.html` (galería e historia) y `assets/images/hero.svg` → foto del hero.

Proporciones sugeridas para que la galería se vea bien:

| Archivo        | Proporción | Uso                     |
| -------------- | ---------- | ----------------------- |
| `hero.svg`     | 4:5        | Fondo del hero          |
| `gallery-1.svg`| 4:5        | Historia / galería      |
| `gallery-2.svg`| 5:4        | Galería (ancha)         |
| `gallery-3.svg`| 1:1        | Galería                 |
| `gallery-4.svg`| 4:5        | Galería (alta)          |
| `gallery-5.svg`| 4:3        | Galería (ancha)         |
| `gallery-6.svg`| 5:6        | Galería                 |

También puedes cambiar los `alt` y los `data-caption` para que el lightbox muestre otra frase.

### 4. Elementos de Canva — `assets/images/canva/`

Tomados de la plantilla de timeline que compartieron y recoloreados a la paleta de la invitación:

- `eucalipto-rama.svg` y `eucalipto-rama-larga.svg`: se conservan como referencia, pero ya no se usan en la página.
- `icono-anillos.png`: cuenta regresiva.
- `icono-iglesia.svg`: tarjeta de ceremonia.
- `icono-copas.svg`: tarjeta de recepción.
- `icono-camara.png`: encabezado de la galería.
- `icono-auto.png` e `icono-auto-claro.png`: auto del footer (versión clara para fondo verde).
- `fuente/`: versiones SVG de los iconos, por si quieres reexportarlos o recolorearlos.

Los archivos originales que enviaron están en `assets/canva/`; se conservan como referencia y **no se cargan en la página**.

> Los elementos decorativos provienen de la plantilla de Canva compartida por los novios y fueron recoloreados a la paleta. Si la plantilla es de otro autor, revisa la licencia de Canva antes de publicar.

### 5. Colores y tipografías — `css/styles.css`

Al inicio, en `:root`, están las variables de color:

```css
--ivory: #f8f4ec;        /* fondo marfil */
--terracotta: #b5644a;   /* acento decorativo */
--sage: #8fa085;         /* verde salvia decorativo */
--ink: #2f2b26;          /* texto principal de alto contraste */
```

Cambia esos valores para adaptar toda la invitación. Las fuentes se declaran en `--font-serif`
(Cormorant Garamond) y `--font-sans` (Montserrat).

## Reserva de asistencia (RSVP)

El formulario es **visual**: al enviarlo muestra la confirmación, lanza confeti y guarda la respuesta
en `localStorage` del navegador (`rsvp-bleidys-miguel`).

Importante: `localStorage` es solo de cada dispositivo; **los novios no reciben las respuestas**.

El formulario acepta: nombre, asistencia (sí/no), número de personas y un mensaje opcional. El cupo
máximo se ajusta con `maxGuests` en `CONFIG`; si se supera, el formulario muestra un aviso y no envía.

## Cómo funciona la apertura del sobre

1. `index.html` muestra el sobre sobre la página (la página está bloqueada con `is-locked`).
2. Al pulsar **Abrir invitación**, `js/app.js` añade clases que abren la solapa en 3D, rompen el sello
   y sacan la carta.
3. Después de ~2,6 s el sobre se desvanece, se desbloquea el scroll y el hero entra escalonado.

Si el usuario tiene activado **reducir movimiento** en su sistema, las animaciones se acortan y se
desactivan los pétalos (accesibilidad).

## Publicarla gratis

No necesita build. Puedes subir la carpeta tal cual a:

- **Netlify Drop**: arrastra la carpeta `invitacion-boda` a https://app.netlify.com/drop
- **GitHub Pages**: sube el repo y activa Pages en la rama principal.
- **Vercel**: importa el repositorio como sitio estático.

## Compatibilidad

Navegadores modernos (Chrome, Edge, Firefox, Safari recientes). En móvil está probado a 320 px de ancho.
El sobre usa `clip-path`, `aspect-ratio` y transformaciones 3D.
