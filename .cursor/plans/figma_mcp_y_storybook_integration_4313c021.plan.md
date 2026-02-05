---
name: Figma MCP y Storybook Integration
overview: Configurar integración con Figma MCP para sincronizar componentes desde Figma, crear Storybook propio para documentación y desarrollo, y establecer workflow de migración gradual desde Prophero hacia el design system propio de Vistral.
todos:
  - id: paso-0-setup-repo
    content: 'PASO 0: Setup inicial del repositorio - Crear vistral-design-system al mismo nivel que vistral_supply, inicializar como paquete npm, configurar TypeScript, copiar y adaptar reglas de Cursor (.cursor/rules/), crear VISTRAL_DESIGN_SYSTEM_RULES.md, estructura base lista'
    status: completed
  - id: paso-1-figma-mcp-setup
    content: 'PASO 1: Configurar Figma MCP (sofisticado pero sencillo) - Sistema de configuración centralizado con validación, cliente reutilizable con error handling, soporte multi-archivo. Ejecución: crear config.ts, variables de entorno, script de prueba npm run figma:test'
    status: completed
  - id: paso-2-storybook-basico
    content: 'PASO 2: Setup Storybook básico (escalable) - Configuración modular multi-framework, sistema de temas preparado, estructura escalable, webpack optimizado. Ejecución: npx storybook init o manual, config mínima, npm run storybook'
    status: pending
  - id: paso-3-primer-story-manual
    content: 'PASO 3: Crear primer story manual - Story para Button existente, validar funcionamiento en Storybook'
    status: pending
  - id: paso-4-extraccion-tokens-basica
    content: 'PASO 4: Extracción de tokens (escalable) - Sistema de mapeo configurable, soporte multi-tipo, validación Zod, cache inteligente. Ejecución: npm run figma:sync:tokens, config en token-mapping.ts, output JSON claro'
    status: pending
  - id: paso-5-generar-css-tokens
    content: 'PASO 5: Generar CSS desde tokens (multi-formato) - Generador pluggable CSS/SCSS/JS/TS, soporte temas, types autogenerados. Ejecución: npm run tokens:generate, integración automática en globals.css'
    status: pending
  - id: paso-6-story-tokens
    content: 'PASO 6: Story de tokens - Crear DesignTokens.stories.tsx para visualizar tokens, validar en Storybook'
    status: pending
  - id: paso-7-sincronizar-primer-componente
    content: 'PASO 7: Sincronizar primer componente (templates inteligentes) - Sistema de templates, detección automática variantes/estados, generación props TypeScript, validación pre-generación. Ejecución: npm run figma:sync:component Button, templates configurables, output claro'
    status: pending
  - id: paso-8-mejoras-incrementales
    content: 'PASO 8+: Mejoras incrementales - Agregar addons Storybook, documentación, CI/CD según necesidad (ejecutar según prioridad)'
    status: pending
isProject: false
---

# Plan: Integración Figma MCP + Storybook para Design System Vistral

## Contexto Actual

- **Design System Actual:** Prophero (referencia externa en Storybook)
- **Tokens:** Definidos en `app/prophero.css` con prefijo `--prophero-*`
- **Componentes UI:** ~26 componentes básicos en `components/ui/`
- **Problema:** Dependencia externa lenta, diseño ya completo en Figma
- **Objetivo:** Autonomía con sincronización desde Figma y Storybook propio

## Arquitectura Propuesta

```
┌─────────────┐
│   Figma     │ (Design System completo)
└──────┬──────┘
       │ Figma MCP API
       ▼
┌─────────────────┐
│  Sync Scripts   │ (lib/figma-sync/)
│  - Tokens       │
│  - Components   │
│  - Assets       │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐     ┌──────────────┐
│  Design Tokens  │────▶│  Storybook   │
│  (tokens.json)  │     │  (Local)     │
└─────────────────┘     └──────────────┘
       │                        │
       ▼                        ▼
┌─────────────────┐     ┌──────────────┐
│  Components/    │     │  Docs &     │
│  UI (React)     │     │  Testing    │
└─────────────────┘     └──────────────┘
```

## Fase 1: Configuración Base (Semana 1)

### 1.1 Configurar Figma MCP

**Archivos a crear:**

- `.cursor/mcp-servers/figma.json` - Configuración MCP
- `lib/figma-sync/config.ts` - Configuración de acceso a Figma
- `.env.local` - Variables de entorno para Figma API

**Pasos:**

1. Obtener Figma Personal Access Token
2. Identificar File ID del archivo principal de Figma
3. Configurar MCP server en Cursor
4. Crear utilidades básicas para leer desde Figma API

**Dependencias a agregar:**

```json
{
  "@figma/rest-api-spec": "^1.0.0",
  "figma-api": "^1.11.0"
}
```

### 1.2 Setup de Storybook

**Archivos a crear:**

- `.storybook/main.ts` - Configuración principal
- `.storybook/preview.ts` - Configuración de preview (themes, decorators)
- `.storybook/manager.ts` - Configuración del manager (opcional)

**Estructura:**

```
.storybook/
  ├── main.ts
  ├── preview.ts
  └── manager.ts
stories/
  ├── Introduction.stories.mdx
  ├── DesignTokens.stories.tsx
  └── components/
      └── ui/
          ├── Button.stories.tsx
          └── ...
```

**Dependencias a agregar:**

```json
{
  "@storybook/react": "^8.0.0",
  "@storybook/addon-essentials": "^8.0.0",
  "@storybook/addon-docs": "^8.0.0",
  "@storybook/addon-controls": "^8.0.0",
  "@storybook/addon-viewport": "^8.0.0",
  "storybook": "^8.0.0"
}
```

**Scripts en package.json:**

```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

## Fase 2: Sincronización de Tokens (Semana 1-2)

### 2.1 Extraer Tokens desde Figma

**Archivos a crear:**

- `lib/figma-sync/extract-tokens.ts` - Script para extraer tokens
- `lib/figma-sync/types.ts` - Tipos para tokens de Figma
- `lib/design-tokens/vistral-tokens.json` - Tokens sincronizados
- `lib/design-tokens/generator.ts` - Generador de CSS/TS desde JSON

**Flujo:**

1. Conectar a Figma API usando MCP
2. Leer estilos de texto, colores, efectos desde el archivo
3. Mapear a estructura de tokens estándar
4. Generar `vistral-tokens.json`
5. Generar CSS variables en `app/vistral-tokens.css`
6. Generar TypeScript types en `lib/design-tokens/types.ts`

**Estructura de tokens:**

```json
{
  "colors": {
    "primary": { "50": "#...", "500": "#...", "900": "#..." },
    "semantic": { "success": "#...", "error": "#..." }
  },
  "typography": {
    "fontFamily": { "sans": "...", "mono": "..." },
    "fontSize": { "xs": "12px", "sm": "14px", ... }
  },
  "spacing": { "xs": "4px", "sm": "8px", ... },
  "radius": { "sm": "4px", "md": "8px", ... }
}
```

### 2.2 Sistema de Tokens Dual (Prophero + Vistral)

**Archivos a modificar:**

- `app/globals.css` - Agregar import de `vistral-tokens.css`
- `lib/utils.ts` - Helper para usar tokens Vistral
- `.cursor/rules/02-design-system.mdc` - Actualizar reglas

**Estrategia:**

- Mantener `--prophero-*` para compatibilidad
- Agregar `--vistral-*` para nuevos componentes
- Migración gradual: componentes nuevos usan Vistral, existentes pueden seguir usando Prophero

## Fase 3: Sincronización de Componentes (Semana 2-3)

### 3.1 Script de Sincronización

**Archivos a crear:**

- `lib/figma-sync/sync-components.ts` - Script principal
- `lib/figma-sync/component-generator.ts` - Generador de componentes React
- `scripts/sync-figma.ts` - CLI script ejecutable

**Funcionalidades:**

1. Leer componentes desde Figma
2. Extraer propiedades (variants, states, props)
3. Generar código base de componentes React
4. Generar stories para Storybook
5. Validar estructura y naming

**Comandos:**

```bash
npm run figma:sync:tokens    # Sincronizar solo tokens
npm run figma:sync:components # Sincronizar componentes
npm run figma:sync:all       # Sincronizar todo
```

### 3.2 Generación de Componentes Base

**Template de componente generado:**

```typescript
// components/ui/[ComponentName].tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      /* desde Figma */
    },
    size: {
      /* desde Figma */
    },
  },
})

export interface ComponentNameProps extends VariantProps<typeof componentVariants> {
  // Props desde Figma
}
```

**Template de Story:**

```typescript
// stories/components/ui/[ComponentName].stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from '@/components/ui/component-name'

const meta = {
  title: 'UI/ComponentName',
  component: ComponentName,
  // ...
} satisfies Meta<typeof ComponentName>
```

## Fase 4: Storybook Setup Completo (Semana 3)

### 4.1 Configuración Avanzada

**Addons esenciales:**

- `@storybook/addon-essentials` - Controls, Actions, Docs
- `@storybook/addon-viewport` - Testing responsive
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-designs` - Integración con Figma (opcional)

**Temas y Modos:**

- Light/Dark mode support
- Theme switcher
- Viewport presets (mobile, tablet, desktop)

### 4.2 Documentación

**Archivos a crear:**

- `stories/Introduction.stories.mdx` - Overview del design system
- `stories/DesignTokens.stories.tsx` - Visualización de tokens
- `stories/GettingStarted.stories.mdx` - Guía de uso

**Contenido:**

- Guía de instalación
- Cómo usar componentes
- Cómo contribuir
- Convenciones de código

## Fase 5: Workflow de Desarrollo (Semana 4)

### 5.1 Proceso de Sincronización

**Workflow:**

1. Diseñador actualiza componentes en Figma
2. Developer ejecuta `npm run figma:sync:all`
3. Script genera/actualiza componentes y stories
4. Developer revisa y ajusta código generado
5. Developer ejecuta Storybook para validar
6. Developer implementa lógica de negocio si es necesario
7. Commit y PR

### 5.2 CI/CD para Storybook

**Archivos a crear:**

- `.github/workflows/storybook.yml` - Deploy automático
- `netlify.toml` o `vercel.json` - Configuración de hosting

**Opciones de hosting:**

- Vercel (recomendado, integración con Next.js)
- Netlify
- GitHub Pages
- Chromatic (pago, pero con visual testing)

### 5.3 Actualización de Reglas Cursor

**Archivos a modificar:**

- `.cursor/rules/02-design-system.mdc` - Actualizar referencias
- Agregar sección sobre Figma sync
- Agregar sección sobre Storybook

## Estructura Final de Archivos

### Repositorio: `vistral-design-system` (NUEVO)

```
vistral-design-system/
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
├── stories/
│   ├── Introduction.stories.mdx
│   ├── DesignTokens.stories.tsx
│   └── components/
│       └── ui/
│           └── *.stories.tsx
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── *.tsx (componentes React)
│   ├── tokens/
│   │   ├── vistral-tokens.json
│   │   ├── vistral-tokens.css
│   │   └── types.ts
│   └── index.ts (exports principales)
├── lib/
│   ├── figma-sync/
│   │   ├── config.ts
│   │   ├── extract-tokens.ts
│   │   ├── sync-components.ts
│   │   ├── component-generator.ts
│   │   └── types.ts
│   └── generators/
│       └── token-generator.ts
├── scripts/
│   ├── sync-figma.ts
│   └── build.ts
├── package.json (paquete npm)
├── tsconfig.json
└── README.md
```

### Integración en `vistral_supply` (futuro)

```json
// vistral_supply/package.json
{
  "dependencies": {
    "@vistral/design-system": "workspace:*" // o versión npm
  }
}
```

```typescript
// vistral_supply/components/ui/Button.tsx
import { Button } from '@vistral/design-system'
// o usar directamente los componentes
```

## Consideraciones Importantes

### Compatibilidad con Prophero

- Mantener tokens Prophero durante migración
- Componentes nuevos usan tokens Vistral
- Componentes existentes pueden migrarse gradualmente
- Helper function para convertir entre sistemas si es necesario

### Naming Conventions

- Tokens: `--vistral-*` (prefijo para diferenciar de Prophero)
- Componentes: Mantener naming actual (PascalCase)
- Stories: Seguir estructura `UI/ComponentName`

### Testing

- Storybook como herramienta de testing visual
- Tests unitarios para componentes críticos
- Accessibility testing con addon-a11y

### Performance

- Sincronización incremental (solo cambios)
- Caching de respuestas de Figma API
- Lazy loading en Storybook para componentes grandes

## Principios de Diseño: Sofisticado pero Sencillo

**Objetivo:** Configuraciones escalables desde el inicio, pero fáciles de ejecutar paso a paso.

### Arquitectura Escalable

- **Configuración modular:** Cada pieza funciona independientemente pero se integra fácilmente
- **Type-safe desde el inicio:** TypeScript types generados automáticamente
- **Extensible:** Fácil agregar nuevos tipos de tokens, componentes, o formatos de salida
- **Cache inteligente:** Evitar llamadas redundantes a Figma API
- **Validación automática:** Verificar estructura y tipos antes de generar código

### Ejecución Sencilla

- **Un comando por paso:** Scripts simples y claros (`npm run figma:sync`)
- **Configuración mínima:** Solo lo esencial para empezar, el resto es opcional
- **Errores claros:** Mensajes de error que guían hacia la solución
- **Documentación inline:** Comentarios y ejemplos en el código
- **Progreso visible:** Logs claros de qué está pasando en cada paso

## Enfoque Incremental - Ejecución Paso a Paso

Este plan está diseñado para ejecutarse paso a paso, validando cada etapa antes de continuar. Cada paso construye sobre el anterior con arquitectura sólida pero implementación simple:

### Paso 0: Setup Inicial del Repositorio (Pre-requisito)

**Arquitectura escalable:**

- Paquete npm con exports bien definidos (ESM + CJS)
- TypeScript configurado para desarrollo y build
- Estructura modular que facilita agregar nuevas features
- Configuración lista para publicación npm (privada o pública)

**Ejecución sencilla:**

- Comando único: `npm init` o `pnpm init`
- Template básico de package.json con metadata
- tsconfig.json con configuración estándar

**Pasos:**

- Crear nuevo directorio `vistral-design-system`
- Inicializar package.json con nombre `@vistral/design-system`
- Configurar TypeScript básico
- Crear estructura de carpetas (src/, lib/, scripts/, stories/)
- **Copiar y adaptar reglas de Cursor desde vistral_supply:**
  - Copiar `.cursor/rules/` completo
  - Adaptar `00-core.mdc` para design system (sin Next.js/Supabase específico)
  - Adaptar `02-design-system.mdc` para nuevo sistema Vistral (reemplazar Prophero)
  - Crear `VISTRAL_DESIGN_SYSTEM_RULES.md` adaptado del original
  - Copiar `.cursorignore` y adaptar si es necesario
- Configurar exports en package.json
- **Validación:** `npm install` funciona, estructura lista, reglas de Cursor funcionando

### Paso 1: Configurar Figma MCP (Primer paso)

**Arquitectura escalable:**

- Sistema de configuración centralizado con validación de tipos
- Cliente Figma reutilizable con manejo de errores y retry logic
- Soporte para múltiples archivos desde el inicio (aunque empecemos con uno)

**Ejecución sencilla:**

- Un solo archivo de configuración: `lib/figma-sync/config.ts`
- Variables de entorno simples: `FIGMA_TOKEN` y `FIGMA_FILE_ID`
- Script de prueba: `npm run figma:test` que valida conexión

**Pasos:**

- Obtener Personal Access Token de Figma
- Identificar File ID del archivo principal
- Crear `lib/figma-sync/config.ts` con validación de tipos
- Crear cliente básico con manejo de errores
- **Validación:** Ejecutar `npm run figma:test` y ver respuesta exitosa

### Paso 2: Setup Storybook Básico (Segundo paso)

**Arquitectura escalable:**

- Configuración modular con soporte para múltiples frameworks (React, Vue, etc.)
- Sistema de temas preparado para light/dark mode
- Estructura de carpetas que escala a cientos de componentes
- Webpack/Vite config optimizado para performance

**Ejecución sencilla:**

- Comando único: `npx storybook@latest init` (o manual si preferimos control)
- Configuración mínima en `.storybook/main.ts` y `preview.ts`
- Script simple: `npm run storybook` para iniciar

**Pasos:**

- Instalar dependencias con versión específica para estabilidad
- Crear configuración base con paths y aliases correctos
- Configurar preview con decoradores básicos
- **Validación:** `npm run storybook` abre en localhost:6006 con página de bienvenida

### Paso 3: Primer Story Manual (Tercer paso)

**Arquitectura escalable:**

- Template reutilizable para stories futuros
- Sistema de decoradores para contexto común (theme, i18n, etc.)
- Estructura que facilita agregar más stories

**Ejecución sencilla:**

- Crear un archivo: `stories/components/ui/Button.stories.tsx`
- Usar componente existente sin modificaciones
- **Validación:** Ver componente en Storybook funcionando con controles

**Pasos:**

- Crear story para Button existente con todas sus variantes
- Configurar controles y args
- Validar que funciona correctamente
- **Validación:** Ver componente en Storybook funcionando

### Paso 4: Extracción de Tokens Básica (Cuarto paso)

**Arquitectura escalable:**

- Sistema de mapeo configurable (Figma → JSON → CSS/TS)
- Soporte para múltiples tipos de tokens (colors, typography, spacing, etc.)
- Validación de estructura con Zod schemas
- Cache inteligente para evitar re-extraer tokens sin cambios

**Ejecución sencilla:**

- Un comando: `npm run figma:sync:tokens`
- Configuración en `lib/figma-sync/token-mapping.ts` (fácil de ajustar)
- Output claro: `lib/design-tokens/vistral-tokens.json` generado

**Pasos:**

- Crear sistema de mapeo con tipos TypeScript
- Script que lee estilos desde Figma API
- Validación con Zod schema
- Generar JSON estructurado
- **Validación:** Ver `vistral-tokens.json` con estructura correcta

### Paso 5: Generar CSS desde Tokens (Quinto paso)

**Arquitectura escalable:**

- Generador multi-formato (CSS, SCSS, JS, TS) desde el mismo JSON
- Sistema de transformación pluggable (fácil agregar nuevos formatos)
- Soporte para temas (light/dark) desde el inicio
- TypeScript types generados automáticamente para autocomplete

**Ejecución sencilla:**

- Un comando: `npm run tokens:generate` (lee JSON, genera CSS/TS)
- Configuración mínima: solo especificar qué formatos generar
- Integración automática: script actualiza `globals.css` automáticamente

**Pasos:**

- Crear generador con soporte para CSS y TypeScript
- Template system para diferentes formatos de salida
- Generar `vistral-tokens.css` con variables CSS
- Generar `lib/design-tokens/types.ts` para TypeScript
- Integrar CSS en `globals.css`
- **Validación:** Variables `--vistral-*` disponibles en DevTools

### Paso 6: Story de Tokens (Sexto paso)

**Arquitectura escalable:**

- Componente visualizador reutilizable para cualquier tipo de token
- Sistema de grid/flex automático que se adapta al contenido
- Soporte para mostrar múltiples formatos (hex, rgb, variables CSS)

**Ejecución sencilla:**

- Crear un archivo: `stories/DesignTokens.stories.tsx`
- Leer tokens desde JSON generado
- Renderizar visualmente
- **Validación:** Ver tokens en Storybook con colores, tipografía, etc.

**Pasos:**

- Crear componente visualizador de tokens
- Story que muestra todos los tokens organizados
- **Validación:** Ver tokens en Storybook

### Paso 7: Sincronizar Primer Componente (Séptimo paso)

**Arquitectura escalable:**

- Sistema de templates para diferentes tipos de componentes
- Detección automática de variantes y estados desde Figma
- Generación de props TypeScript desde propiedades de Figma
- Soporte para componentes simples y complejos (con sub-componentes)
- Validación de naming y estructura antes de generar

**Ejecución sencilla:**

- Un comando: `npm run figma:sync:component Button` (o todos: `npm run figma:sync:components`)
- Configuración de templates en `lib/figma-sync/templates/`
- Output claro: componente + story generados en ubicaciones correctas

**Pasos:**

- Crear sistema de templates con placeholders inteligentes
- Script que lee componente desde Figma (variants, properties, etc.)
- Mapeo de Figma properties → React props
- Generar componente con CVA y tipos TypeScript
- Generar story con todas las variantes automáticamente
- **Validación:** Componente renderiza correctamente en Storybook con todas sus variantes

### Pasos Siguientes (Iterativos)

- Repetir paso 7 para cada componente adicional
- Agregar mejoras incrementales según necesidad
- Documentar conforme avanzamos

## Próximos Pasos Inmediatos

**EJECUTAR PASOS EN ORDEN:**

1. **Paso 0: Setup inicial del repositorio** - Crear estructura base del paquete npm
2. **Paso 1: Configurar Figma MCP** - Obtener tokens y configurar acceso básico

- Validar conexión antes de continuar

## Métricas de Éxito

- ✅ Storybook funcionando localmente
- ✅ Sincronización automática desde Figma
- ✅ Al menos 5 componentes sincronizados y documentados
- ✅ Tokens extraídos y generando CSS/TS correctamente
- ✅ Workflow documentado y probado por el equipo
