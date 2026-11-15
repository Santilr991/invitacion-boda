# Rediseño de ubicaciones de boda Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar de forma más elegante las fotografías de Iglesia Inmaculada y Sorento y pulir la presentación responsive de la invitación.

**Architecture:** Mantener la arquitectura estática actual: contenido estructural en `index.html`, datos dinámicos en `js/app.js` y presentación en `css/styles.css`. El rediseño se limitará a la sección de eventos y a ajustes visuales generales de bajo riesgo, sin dependencias nuevas.

**Tech Stack:** HTML, CSS, JavaScript vanilla, imágenes WebP locales.

**Spec:** `docs/superpowers/specs/2026-11-14-ubicaciones-diseno.md`

## Global Constraints

- Usar las imágenes existentes `assets/images/iglesia.webp` y `assets/images/recepcion.webp`.
- Mantener la paleta marfil, terracota, salvia, tinta cálida y dorado existente.
- No añadir dependencias.
- No inventar direcciones pendientes.
- Mantener navegación por teclado y movimiento reducido.

## Review Focus

- Fotografías con proporciones distintas: ambas deben conservar un recorte agradable sin deformarse. Verificar los dos `<img>` y sus reglas `object-fit`.
- Viewport móvil estrecho: las tarjetas no deben desbordar horizontalmente. Verificar con viewport de 320–375 px.
- Fotografía oscura de Sorento: el texto debe permanecer sobre una superficie clara y con contraste suficiente. Verificar la tarjeta en navegador.
- Datos renderizados por JavaScript: los nombres visibles no deben volver a los placeholders. Verificar `applyConfig()` y sus selectores.
- Preferencia de movimiento reducido: los ajustes no deben introducir animaciones nuevas obligatorias. Verificar que la sección conserve el comportamiento existente.

---

### Task 1: Rediseñar tarjetas de ubicaciones

**Files:**
- Modify: `index.html:212-240`
- Modify: `css/styles.css:1302-1433`

**Interfaces:**
- Consumes: `assets/images/iglesia.webp`, `assets/images/recepcion.webp` y la estructura actual de `.event-card`.
- Produces: tarjetas con imagen superior, jerarquía visual clara, recorte responsive y controles de ubicación intactos.

- [ ] **Step 1: Ajustar el marcado de las dos tarjetas**

  Mantener una imagen `<img class="event-photo">` al inicio de cada tarjeta, con `loading="lazy"`, `decoding="async"` y textos alternativos descriptivos. Conservar los iconos, nombres dinámicos, horarios, direcciones y enlaces actuales.

- [ ] **Step 2: Implementar la composición visual en CSS**

  Hacer que la fotografía ocupe el ancho interior de la tarjeta, tenga una altura responsive y use `object-fit: cover`. Ajustar radios, márgenes, separación entre imagen e información y la superposición del marco decorativo sin tapar contenido.

- [ ] **Step 3: Ajustar el comportamiento responsive**

  En el breakpoint móvil, apilar las tarjetas y asegurar que la foto, el marco y el contenido respeten el ancho de la tarjeta sin crear overflow horizontal.

- [ ] **Step 4: Verificar manualmente el resultado visual**

  Abrir la invitación en escritorio y móvil, desplazarse hasta `#evento`, y confirmar que la imagen de la iglesia se percibe luminosa, la de Sorento conserva su ambiente nocturno y ambos botones siguen siendo claros y alcanzables.

### Task 2: Sincronizar contenido y pulir detalles generales

**Files:**
- Modify: `js/app.js:16-28`
- Modify: `css/styles.css` (reglas de responsive y estados existentes que afecten eventos)

**Interfaces:**
- Consumes: `CONFIG.ceremony`, `CONFIG.reception` y los selectores `data-ceremony-*` / `data-reception-*`.
- Produces: nombres “Iglesia Inmaculada” y “Sorento” sincronizados en el HTML y en el render dinámico, con enlaces de mapa conservando sus destinos por nombre.

- [ ] **Step 1: Confirmar datos de configuración**

  Mantener `name: "Iglesia Inmaculada"` y `name: "Sorento"`; mantener horarios y direcciones pendientes sin inventar datos; usar consultas de mapa basadas en los nombres.

- [ ] **Step 2: Aplicar solo pulidos generales de bajo riesgo**

  Mejorar únicamente espaciado, contraste o foco visible que afecte directamente la sección de eventos. No alterar la paleta, tipografías ni composición de otras secciones sin una razón visual verificable.

- [ ] **Step 3: Verificar JavaScript y referencias de recursos**

  Ejecutar `node --check js/app.js` y comprobar que ambos archivos WebP referenciados existan.

### Task 3: Revisión final de calidad

**Files:**
- Verify: `index.html`, `css/styles.css`, `js/app.js`

**Interfaces:**
- Consumes: resultado de las tareas 1 y 2.
- Produces: una sección de ubicaciones usable en escritorio, móvil, teclado y movimiento reducido.

- [ ] **Step 1: Ejecutar comprobaciones estáticas**

  Ejecutar `git diff --check` y `node --check js/app.js`; el resultado esperado es código de salida 0.

- [ ] **Step 2: Revisar el diff contra la especificación**

  Confirmar que solo se agregaron las mejoras descritas, que no se eliminaron cambios de usuario existentes y que los criterios de aceptación de la especificación están cubiertos.

- [ ] **Step 3: Comprobar responsive en navegador**

  Revisar la sección en escritorio y en un viewport móvil estrecho; confirmar ausencia de desbordamiento, legibilidad de botones y presencia de las dos imágenes.
