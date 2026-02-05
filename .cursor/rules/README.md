# Cursor Rules - Vistral Design System

Este directorio contiene las reglas modulares de Cursor para el Design System de Vistral.

## Estructura

Las reglas están organizadas por número y tema:

- `00-core.mdc` - Reglas base (stack, estructura, seguridad básica, workflow)
- `01-security.mdc` - Guardrails de seguridad y protección de credenciales
- `02-design-system.mdc` - Design system (Vistral tokens, componentes, Figma sync)
- `03-figma-sync.mdc` - Reglas para sincronización con Figma
- `04-storybook.mdc` - Reglas para Storybook y documentación

## Formato de Archivos

Cada archivo `.mdc` incluye:

**YAML Frontmatter:**

```yaml
---
version: 1.0
owner: Vistral Lab
lastUpdated: 2026-02-02
glob: ['**/components/**']
alwaysApply: false
description: 'Descripción de la regla'
---
```

**Campos:**

- `version` - Versión de la regla
- `owner` - Propietario/equipo
- `lastUpdated` - Fecha de última actualización
- `glob` - Patrones de archivos donde aplica (array o string)
- `alwaysApply` - Si aplica siempre (true) o solo en archivos matching glob (false)
- `description` - Descripción breve

## Glob Patterns

Los glob patterns determinan dónde se aplican las reglas:

- `**/*` - Todos los archivos
- `**/components/**` - Solo archivos en components/
- `["**/lib/figma-sync/**", "**/scripts/**"]` - Múltiples patrones

## Agregar Nuevas Reglas

1. **Crear archivo:** `XX-description.mdc`
2. **Agregar frontmatter** con version, owner, glob, etc.
3. **Escribir contenido** siguiendo formato markdown
4. **Actualizar este README** con la nueva regla
5. **Commit** con mensaje descriptivo

## Versionado

Cuando modifiques una regla:

- **Patch (1.0 → 1.1):** Correcciones menores, clarificaciones
- **Minor (1.0 → 2.0):** Nuevas reglas, cambios significativos
- **Major (1.0 → 2.0):** Cambios breaking, refactorización importante

Actualiza `lastUpdated` en cada cambio.

## Uso en Cursor

Cursor automáticamente lee estos archivos cuando:

- Están en `.cursor/rules/`
- Tienen extensión `.mdc`
- Tienen frontmatter válido

No necesitas configuración adicional. Las reglas se aplican según los glob patterns definidos.

## Documento Maestro

Para documentación completa para humanos, ver:

- `VISTRAL_DESIGN_SYSTEM_RULES.md` en la raíz del proyecto

Este README es solo para las reglas modulares de Cursor.
