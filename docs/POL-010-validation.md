# POL-010 · Informe de entrega

Fecha: 19 de octubre de 2026 (Europe/Madrid).

Este documento conserva los resultados de la entrega inicial. La [revisión POL-010.1](POL-010.1-security-review.md) amplía y corrige la valoración de reproducibilidad: `npm ls` falla con `ELSPROBLEMS` y la instalación estricta falla con `ERESOLVE`, aunque el lint y la instalación estándar funcionen.

## Alcance y decisiones

Repositorio `jichef/polenia`, inicialmente vacío, clonado en `repository/` dentro del workspace. Rama local seleccionada: `feature/pol-010-foundation`.

Base con Next.js 16.4.2, React 19.3.1, App Router, TypeScript 5.9.3 estricto y alias `@/*`. CSS nativo, componentes de servidor y fuentes del sistema. No se requieren secretos para ejecutar el proyecto.

La página provisional declara que no hay datos conectados. Incluye idioma español, regiones semánticas, un único encabezado principal, salto al contenido, foco visible y tamaños fluidos. Los directorios de datos, integraciones y administración solo reservan su estructura mediante documentación.

ESLint 10.13.0 con configuración de Next.js; Prettier 3.9.10 para formato. Vitest 5.0.5 con Testing Library y jsdom. Dependencias directas fijadas y lockfile versionable.

## Archivos creados

El repositorio no contenía archivos previos; todos los siguientes son nuevos:

- Configuración: `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`.
- Consistencia y exclusiones: `.editorconfig`, `.gitattributes`, `.gitignore`, `.nvmrc`, `.prettierrc.json`, `.prettierignore`.
- Aplicación: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/site-header.tsx`.
- Pruebas: `src/app/page.test.tsx`, `tests/setup.ts`.
- Módulos reservados: `src/data/README.md`, `src/integrations/README.md`, `src/admin/README.md`.
- Documentación: `README.md`, `docs/POL-010-validation.md`.

## Validación

Entorno: Windows, Node.js 22.20.0 y npm 10.9.3.

| Comprobación                               | Resultado                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Instalación inicial (`npm install`)        | Correcta; genera lockfile                                                                                          |
| Instalación reproducible (`npm ci`)        | Correcta; avisos descritos más abajo                                                                               |
| `npm run lint`                             | Correcto, sin advertencias de lint                                                                                 |
| `npm run format:check`                     | Correcto                                                                                                           |
| `npm run typecheck`                        | Correcto, incluidos tipos de rutas generados                                                                       |
| `npm test`                                 | 1 archivo, 2 pruebas correctas                                                                                     |
| `npm run build`                            | Correcto; `/` prerenderizada y página 404 de Next.js                                                               |
| `npm run check` tras `npm ci`              | Correcto, ejecuta todas las comprobaciones anteriores                                                              |
| Servidor de producción local (`npm start`) | HTTP 200 en `127.0.0.1:3100`; idioma, título y aviso de ausencia de datos presentes; servidor detenido al terminar |
| `npm audit --omit=dev`                     | 0 vulnerabilidades detectadas                                                                                      |
| Exclusiones de Git                         | Confirmadas para `.env`, `.env.local`, `.env.production`, claves, `node_modules`, `.next`, `.aws` y `.vercel`      |

## Limitaciones observadas

- `npm audit` completo informa de **5 avisos altos** en herramientas de desarrollo, por la cadena `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. El aviso raíz es [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). El registro consultado ofrece `braces` 3.0.3 como última versión, incluida en el rango afectado. La propuesta automática implica retroceder `eslint-config-next` a 14.2.35; no se aplica ese cambio incompatible con la base actual.
- npm muestra avisos de peer dependencies: las versiones transitivas de `eslint-plugin-import`, `eslint-plugin-jsx-a11y` y `eslint-plugin-react` aún declaran rangos hasta ESLint 9. `eslint-config-next` acepta ESLint 10 y el lint completo pasa; quedan pendientes de actualización los rangos de estos plugins.
- La instalación usa una caché en `../.npm-cache`, fuera del repositorio, porque la caché global no era escribible en el sandbox. No cambia la instalación estándar documentada.
- Git avisa de que no puede leer el archivo global de exclusiones del usuario en este sandbox. Las exclusiones del repositorio se han comprobado directamente.
- Las pruebas cubren el HTML y el contenido provisional. No se ha realizado auditoría completa de accesibilidad ni comprobación visual en navegador o dispositivos reales.

## Estado de Git y cierre

`origin` apunta a `https://github.com/jichef/polenia.git`. HEAD está en `feature/pol-010-foundation`, todavía sin commits porque el remoto estaba vacío. Los archivos quedan nuevos, sin stage ni commit. No se ha modificado `main`, hecho push ni abierto una PR.

No se han creado o conectado proyectos Supabase, configurado Vercel, realizado despliegues, implementado autenticación, integrado fuentes externas ni publicado datos ficticios. La entrega termina en POL-010.
