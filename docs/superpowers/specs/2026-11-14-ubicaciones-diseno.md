# Diseño: ubicaciones de la boda

## Intención

Convertir las fotos de la Iglesia Inmaculada y Sorento en el foco visual de la sección “El gran día”, haciendo que cada lugar sea reconocible de inmediato y que la experiencia se mantenga elegante, cálida y coherente con la invitación existente.

## Objetivos

- Presentar una foto amplia y bien recortada para cada lugar.
- Mantener una jerarquía clara: imagen, tipo de evento, lugar, hora y ubicación.
- Diferenciar visualmente la iglesia luminosa de la recepción nocturna sin romper la unidad.
- Mejorar la lectura y el espaciado en escritorio y móvil.
- Conservar la paleta marfil, terracota, salvia y las tipografías actuales.

## Fuera de alcance

- No cambiar la estructura general de la invitación.
- No añadir librerías ni dependencias.
- No inventar direcciones o datos de ubicación que aún están pendientes.
- No reemplazar las animaciones existentes por una animación más intensa.

## Enfoques considerados

1. **Galería separada de ubicaciones:** permitiría fotos más grandes, pero separaría cada imagen de los datos y rompería el flujo de la invitación.
2. **Tarjetas con imagen integrada — elegido:** conserva la relación entre lugar, horario y mapa, y permite que las dos fotos funcionen como una pareja visual.
3. **Imagen de fondo detrás del texto:** sería más llamativa, pero reduciría legibilidad y haría más difícil mantener buen contraste en ambas fotografías.

## Decisión visual

Las tarjetas conservarán una superficie clara y un marco fino. Cada imagen ocupará el ancho interior superior de su tarjeta, con `object-fit: cover`, altura responsive y un recorte específico por fotografía cuando sea necesario. La Iglesia Inmaculada comunicará luz y amplitud; Sorento conservará el ambiente cálido de la recepción nocturna.

En móvil las tarjetas pasarán a una sola columna, con imágenes de mayor altura relativa y sin desbordamientos horizontales. El resto del diseño recibirá solo ajustes de ritmo, contraste y estados interactivos donde aporten claridad.

## Criterios de aceptación

- Las dos imágenes se cargan desde `assets/images/iglesia.webp` y `assets/images/recepcion.webp`.
- Las imágenes tienen textos alternativos descriptivos.
- El nombre visible y el nombre inyectado por JavaScript son “Iglesia Inmaculada” y “Sorento”.
- Las tarjetas no provocan scroll horizontal en viewport móvil.
- Los botones de mapa siguen siendo visibles, legibles y navegables con teclado.
- Se respetan los estilos para movimiento reducido.
