# Polenia

Base técnica de una aplicación web pública, mobile-first, para consultar información polínica de Granada capital. Esta entrega corresponde exclusivamente a **POL-010**.

La página inicial es provisional: no muestra mediciones ni recomendaciones y no conecta fuentes externas. No hay Supabase, autenticación, configuración de Vercel ni despliegues.

## Requisitos e instalación

- Node.js 22.20.0 (fijado en `.nvmrc`) y npm 10.9.3, utilizados en la validación.
- Desde la raíz del repositorio:

```sh
npm ci
npm run dev
```

Abrir <http://localhost:3000>. No se necesitan variables de entorno, credenciales ni servicios externos. La instalación inicial necesita acceso al registro de npm.

## Comandos

```sh
npm run lint          # ESLint, sin advertencias
npm run format:check  # Comprobar formato
npm run format        # Aplicar Prettier
npm run typecheck     # Generar tipos de rutas y ejecutar TypeScript
npm test              # Pruebas automatizadas, una ejecución
npm run test:watch    # Pruebas en modo desarrollo
npm run build         # Compilación de producción
npm start             # Servir la compilación en localhost:3000
npm run check         # Lint, formato, tipos, pruebas y build
```

`next-env.d.ts` y `.next/` se generan con Next.js; no se versionan. `typecheck` funciona también antes del primer build.

## Estructura

```text
src/
  app/             App Router: layout, metadatos, página, CSS y pruebas
  components/      Componentes de interfaz compartidos
  data/            Reserva para modelos y acceso a datos
  integrations/    Reserva para adaptadores externos
  admin/           Reserva para administración, sin rutas ni funciones
tests/             Configuración compartida de pruebas
docs/              Informe de validación
```

Las carpetas reservadas documentan límites, sin introducir implementaciones anticipadas. El alias `@/*` apunta a `src/*`.

## Decisiones técnicas

- Next.js con App Router, TypeScript estricto y componentes de servidor por defecto.
- CSS nativo con tamaños fluidos, sin librería visual ni fuentes remotas.
- Idioma español, estructura semántica, enlace para saltar al contenido y foco visible. Diseño pensado desde móvil.
- ESLint con reglas de Next.js y TypeScript; Prettier controla el formato, sin reglas duplicadas.
- Vitest, jsdom y Testing Library comprueban el aviso de ausencia de datos, estructura principal e idioma y navegación por teclado declarados en el HTML.
- Versiones directas exactas y `package-lock.json` para fijar el árbol con Node.js 22.20.0 y npm 10.9.3. La instalación estándar admite conflictos de peer dependencies de ESLint; la instalación estricta falla. Consultar la revisión de seguridad antes de cambiar herramientas o publicar.
- `.gitignore` excluye entornos, claves, dependencias, cachés y configuración local. Antes de versionar cualquier archivo, revisar que no contenga secretos; el patrón no detecta credenciales incrustadas en código.

Referencia de instalación: [documentación oficial de Next.js](https://nextjs.org/docs/app/getting-started/installation).

## Validación y límites

Consultar [el informe POL-010](docs/POL-010-validation.md). Las pruebas de DOM no sustituyen una auditoría de accesibilidad ni una comprobación visual en dispositivos reales. Las funciones de polen, tiempo, aire, favoritos y recomendaciones quedan fuera de esta entrega.

La [revisión POL-010.1](docs/POL-010.1-security-review.md) detalla la vulnerabilidad transitiva de desarrollo, los conflictos de ESLint 10, los resultados repetidos y la propuesta de historial inicial. No se declara un árbol libre de avisos ni compatible con `strict-peer-deps`.
