# Base técnica y de UI del portfolio

Revisión local del 6 de noviembre de 2026. Objetivo: presentar a Marcos con claridad y permitir explorar sus proyectos en páginas propias. Se conserva la dirección aprobada: Inter, Commit Mono, superficies sobrias y acentos según el tema.

## Criterios y fuentes

Las referencias informan decisiones concretas. Un portfolio atractivo no demuestra por sí mismo accesibilidad, rendimiento o calidad de implementación.

| Fuente primaria | Criterio aplicado |
| --- | --- |
| [W3C WAI: estructura de páginas](https://www.w3.org/WAI/tutorials/page-structure/) | HTML semántico, un título principal y un landmark main; navegación y regiones reconocibles. |
| [Brittany Chiang / Klaviyo: 5 Common Accessibility Pitfalls](https://klaviyo.tech/5-common-accessibility-pitfalls-and-how-to-avoid-them-e316dfc55ff0) | Controles nativos con nombre accesible, foco visible, estructura de títulos y alternativas de imágenes. |
| [W3C WAI: contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Verificación automática de 4,5:1 para los roles de texto, sin redondear antes de comparar. |
| [W3C WAI: tamaño de objetivos](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | El toggle conserva un área de 44 × 44 px; la navegación tiene objetivos amplios. |
| [web.dev: Best practices for fonts](https://web.dev/articles/font-best-practices) | WOFF2 local y precarga limitada a la fuente principal que usa el texto inicial. |
| [Fontsource: subconjuntos](https://fontsource.org/docs/getting-started/subsets) | Se mantiene la selección por unicode-range del paquete. Los subconjuntos declarados no se descargan todos automáticamente. |
| [MDN: imágenes responsive](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images), [Astro: imágenes](https://docs.astro.build/en/guides/images/) | El póster ofrece srcset y sizes acordes al espacio de presentación. |
| [web.dev: back/forward cache](https://web.dev/articles/bfcache), [MDN: pageshow](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event) | Una página restaurada desde caché vuelve a leer la preferencia de tema vigente. |
| [GitHub: workflows de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) | Separación de build y deploy; permisos de escritura limitados al deploy y artefacto de Pages actualizado. |

## Límites de los módulos

| Módulo | Responsabilidad |
| --- | --- |
| src/data/site.ts | Identidad, navegación compartida, contactos y áreas de trabajo. |
| src/pages/ | Composición y rutas. La portada conserva la presentación personal; los proyectos tienen su propio espacio. |
| src/components/Header.astro | Navegación y estado visible de la sección. aria-current="page" se reserva a la URL exacta. |
| src/layouts/BaseLayout.astro | Documento, metadatos, fuentes y controles compartidos. |
| src/scripts/theme.js | Preferencia local, tema del sistema, sincronización y restauración del historial. |
| src/components/ModelViewer.astro | Imagen inicial, activación explícita, estado de carga y visor 3D. |
| src/styles/global.css | Roles de color, tipografía, espaciado, adaptación y estados de interacción. |
| src/content/projects/ | Contenido y estado real de cada proyecto, validado por Astro. |

Astro estático, TypeScript y CSS directo siguen siendo adecuados para esta experiencia. Las interacciones existentes se resuelven con scripts pequeños; el contenido principal está en el HTML.

## Cambios implementados

1. **Navegación compartida.** Portada y Header leen la misma lista. En un caso de estudio, Projects sigue subrayado como sección, mientras que su enlace deja de anunciarse como la página actual.
2. **Estado del tema.** pageshow vuelve a leer la preferencia en restauraciones desde bfcache. Si el almacenamiento está bloqueado, conserva la elección de esa página. Tres pruebas cubren restauración, preferencia eliminada y almacenamiento inaccesible; dos fallaban antes de implementar la recuperación.
3. **Encuadre del PCB.** La imagen inicial llegaba a medir 895,47 px dentro de un área de 576 px. Ahora está contenida por el marco, con object-fit: contain y espacio reservado para los controles. La altura mínima de escritorio/tablet permite que el PCB tenga suficiente presencia; móvil mantiene su tamaño propio.
4. **Imágenes adaptables.** El póster ofrece cinco anchos y tamaños de presentación distintos para móvil, tablet y escritorio. La imagen original se preserva.
5. **Mejora progresiva.** El botón de 3D se habilita cuando su script inicia. El HTML sin JavaScript conserva la imagen y un enlace de descarga del modelo, sin ofrecer un botón inactivo.
6. **Descubrimiento de la fuente.** Se precarga únicamente Inter Latin WOFF2, con la misma URL y modo CORS que usa el CSS. Commit Mono y el resto de subconjuntos mantienen la selección normal del navegador.
7. **Metadatos.** La imagen social tiene una descripción alternativa. Se conservan los metadatos, enlaces canónicos y sitemap existentes.
8. **Proceso de publicación.** Build tiene permisos de lectura; pages:write e id-token:write quedan en deploy. Una ejecución nueva no cancela un despliegue ya en curso. Los resultados de publicación se consultan en el [historial de GitHub Actions](https://github.com/MarcosVerdejoBosch/MarcosVerdejoBosch.github.io/actions).

La base aceptada para main incorpora una corrección adicional de contraste en el tema claro: texto secundario `#49514B` (7,45:1 sobre el fondo), separadores `#809185` (3,03:1) y separadores fuertes `#62766A` (4,42:1). Los colores de acento y la paleta oscura se conservan.

## Imágenes: datos del build

| Ancho del candidato WebP | Bytes |
| --- | ---: |
| 320 px | 50 644 |
| 480 px | 91 400 |
| 640 px | 136 712 |
| 800 px | 182 384 |
| 1088 px | 204 446 |

Son tamaños de archivos generados, no métricas de carga. El navegador elige según densidad, espacio y caché; una imagen grande ya cacheada puede seguir siendo reutilizada. El GLB de unos 19 MB continúa detrás de una activación explícita.

## Verificación

- Astro Check: 0 errores, 0 advertencias y 0 sugerencias.
- Build: cinco rutas estáticas.
- npm run verify: nueve pruebas del tema, veinte pares de color, 75 referencias locales y quince fragmentos.
- Los contratos del HTML comprueban el landmark main, títulos, IDs, metadatos, estado de página actual, fuente precargada, candidatos de imagen y recursos originales.
- Cuarenta comprobaciones en navegador: cinco rutas, dos temas y anchos de 320, 390, 768 y 1280 px. Sin desbordes, póster fuera del marco ni controles encima de la imagen.
- Se probaron navegación, salto al contenido, Enter en el toggle, foco visible, historial, índice del caso, carga del 3D, teclado y Reset view.
- npm audit y npm audit --omit=dev: cero vulnerabilidades conocidas reportadas en esta consulta. Las dependencias no cambiaron.
- La auditoría con capturas y las comprobaciones están referenciadas desde [design-qa.md](../design-qa.md).

Esta revisión no mide Core Web Vitals de usuarios reales ni certifica conformidad completa con WCAG. No se probó un lector de pantalla ni se desactivó JavaScript en el navegador; la alternativa sin JS se comprobó en el HTML generado. El escenario de bfcache se cubrió con eventos simulados en las pruebas; la navegación atrás también se probó en el navegador. El aviso conocido de tamaño del módulo 3D diferido continúa.

## Referencias de portfolios

- [Brittany Chiang](https://brittanychiang.com/): jerarquía personal, tipografía y organización. Su artículo de accesibilidad añade criterios de implementación a la referencia visual.
- [mitxela: Hardware Reverse Oscilloscope 2](https://mitxela.com/projects/rscope2): explicación del proceso, decisiones, compromisos, diagramas y fotos. Es una referencia de documentación técnica, no una plantilla de UI.
- [Tania Rascia](https://www.taniarascia.com/): relación clara entre una introducción personal, proyectos, artículos, demos y código fuente.

## Siguiente trabajo de contenido

Desarrollar un caso de estudio que explique el problema, la contribución de Marcos, las decisiones importantes, la evidencia disponible y el estado actual. En el regulador, las capturas del diseño, los esquemas revisados y las mediciones reales aportarían contexto. Los objetivos de diseño y los resultados medidos deben seguir distinguiéndose.
