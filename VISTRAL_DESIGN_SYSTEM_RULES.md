# Vistral Design System – Guía de proyecto y configuración en Cursor

## Objetivo

Este documento define los **patrones de diseño**, **design system**, **sincronización con Figma**, y **configuraciones de proyecto** que debe seguir todo el equipo para el Design System de Vistral.

**IMPORTANTE:** Este documento es para **humanos**. Las reglas para Cursor están en `.cursor/rules/*.mdc` (ver sección "Sistema de Reglas Modulares" abajo).

---

## Sistema de Reglas Modulares

Las reglas de Cursor están divididas en archivos modulares en `.cursor/rules/` para mejor performance y mantenibilidad:

- **`00-core.mdc`** - Reglas base (stack, estructura, seguridad básica, workflow)
- **`01-security.mdc`** - Guardrails de seguridad y protección de credenciales
- **`02-design-system.mdc`** - Design system (Vistral tokens, componentes, patrones)
- **`03-figma-sync.mdc`** - Sincronización con Figma
- **`04-storybook.mdc`** - Storybook y documentación

Ver `.cursor/rules/README.md` para más detalles sobre el sistema de reglas.

---

## 1. Stack y dependencias base

- **Lenguaje:** TypeScript (strict)
- **UI:** React 19, Radix UI, Tailwind CSS 4
- **Estilos:** class-variance-authority (cva), clsx, tailwind-merge
- **Build:** tsup (ESM + CJS)
- **Package Manager:** npm/pnpm

**Dependencias clave en `package.json`:**

- `react`, `react-dom` (peer dependencies)
- `@radix-ui/*` (dialog, dropdown-menu, label, select, etc.)
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `@figma/rest-api-spec` (para sincronización)
- `@storybook/*` (para documentación)

---

## 2. Estructura de carpetas

```
src/
  components/
    ui/          # Componentes React primitivos
  tokens/        # Design tokens (JSON, CSS, TS)
  lib/
    utils.ts     # Utilidades (cn)
lib/
  figma-sync/    # Scripts de sincronización con Figma
  generators/    # Generadores de código (CSS, TS desde JSON)
scripts/         # Scripts ejecutables (CLI)
stories/         # Stories de Storybook
  components/
    ui/          # Stories por componente
.cursor/
  rules/         # Reglas modulares de Cursor (*.mdc)
```

- **Componentes:** `src/components/ui/` para primitivos
- **Tokens:** `src/tokens/` para design tokens (JSON fuente de verdad)
- **Scripts:** `lib/figma-sync/` para sincronización, `scripts/` para CLI
- **Stories:** `stories/` para Storybook

---

## 3. Design system (Vistral + Figma)

- **Storybook (local):** `npm run storybook` (http://localhost:6006)
- **Tokens:** Definidos en `src/tokens/vistral-tokens.json` (sincronizado desde Figma)
- **Variables CSS:** Prefijo `--vistral-*` (ej. `--vistral-primary-500`, `--vistral-spacing-md`)
- **Generación:** `npm run tokens:generate` genera CSS y TypeScript desde JSON
- **Sincronización:** `npm run figma:sync:tokens` sincroniza tokens desde Figma

**Reglas detalladas:** Ver `.cursor/rules/02-design-system.mdc`

---

## 4. Patrones de componentes (UI)

- **Clases:** `cn(...)` para combinar clases (clsx + tailwind-merge). Nunca concatenar strings a mano.
- **Variantes:** CVA con `variant` y `size`; exportar `componentVariants` y usarlas con `cn(componentVariants({ variant, size, className }))`.
- **Refs:** Componentes que envuelven elementos nativos usan `forwardRef` y pasan `ref` al DOM.
- **Accesibilidad:** Radix para teclado, focus y ARIA; no reinventar modales, selects o dropdowns.

**Reglas detalladas:** Ver `.cursor/rules/02-design-system.mdc`

---

## 5. Sincronización con Figma

- **Configuración:** `lib/figma-sync/config.ts` con `FIGMA_TOKEN` y `FIGMA_FILE_ID`
- **Sincronización:** Scripts en `lib/figma-sync/` y `scripts/sync-figma.ts`
- **Comandos:**
  - `npm run figma:sync:tokens` - Sincronizar solo tokens
  - `npm run figma:sync:components` - Sincronizar componentes
  - `npm run figma:sync:all` - Sincronizar todo
- **Workflow:** Diseñador actualiza Figma → Developer ejecuta sync → Revisa y ajusta → Commit

**Reglas detalladas:** Ver `.cursor/rules/03-figma-sync.mdc`

---

## 6. Storybook

- **Local:** `npm run storybook` (puerto 6006)
- **Build:** `npm run build-storybook` (genera static)
- **Stories:** En `stories/components/ui/` siguiendo patrón `ComponentName.stories.tsx`
- **Documentación:** MDX para documentación rica, stories para ejemplos interactivos

**Reglas detalladas:** Ver `.cursor/rules/04-storybook.mdc`

---

## 7. Seguridad

- **Figma Token:** Solo en `lib/figma-sync/` y `scripts/`, nunca en componentes
- **Environment:** Variables en `.env.local` (no commitear)
- **Gitignore:** `.env*`, `*.pem`, `*.key`, `**/credentials*`

**Reglas detalladas:** Ver `.cursor/rules/01-security.mdc`

---

## 8. Workflow de desarrollo

### Sincronizar desde Figma

1. Diseñador actualiza componentes/tokens en Figma
2. Developer ejecuta `npm run figma:sync:all`
3. Scripts generan/actualizan componentes y tokens
4. Developer revisa cambios generados
5. Developer ejecuta Storybook para validar visualmente
6. Developer ajusta código si es necesario (lógica de negocio, edge cases)
7. Commit y PR

### Agregar nuevo componente manualmente

1. Crear componente en `src/components/ui/ComponentName.tsx`
2. Seguir patrones CVA y forwardRef
3. Crear story en `stories/components/ui/ComponentName.stories.tsx`
4. Exportar en `src/components/ui/index.ts`
5. Documentar en Storybook

---

## 9. Publicación del paquete

### Build

```bash
npm run build
```

Genera:

- `dist/index.js` (CJS)
- `dist/index.mjs` (ESM)
- `dist/index.d.ts` (Types)

### Uso en otros proyectos

**Workspace (desarrollo local):**

```json
{
  "dependencies": {
    "@vistral/design-system": "workspace:*"
  }
}
```

**NPM (producción):**

```json
{
  "dependencies": {
    "@vistral/design-system": "^0.1.0"
  }
}
```

---

## 10. Convenciones

### Naming

- **Componentes:** PascalCase (`Button`, `Input`)
- **Tokens:** kebab-case en JSON, camelCase en TypeScript (`primary-500` → `primary500`)
- **Variables CSS:** `--vistral-*` (prefijo para diferenciar)
- **Stories:** `ComponentName.stories.tsx`

### Versionado

- **Semantic versioning:** `MAJOR.MINOR.PATCH`
- **MAJOR:** Breaking changes en API
- **MINOR:** Nuevas features compatibles
- **PATCH:** Bug fixes

---

## Próximos pasos

1. ✅ Setup inicial del repositorio
2. ⏳ Configurar Figma MCP
3. ⏳ Setup Storybook básico
4. ⏳ Sincronizar primeros tokens
5. ⏳ Sincronizar primeros componentes
