# Vistral Design System - Figma Plugin

Plugin de Figma para extraer tokens de diseño directamente desde Figma.

## Instalación

1. Abre Figma Desktop
2. Ve a `Plugins` > `Development` > `Import plugin from manifest...`
3. Selecciona el archivo `manifest.json` en esta carpeta
4. El plugin aparecerá en `Plugins` > `Development` > `Vistral Design System Token Extractor`

## Uso

1. Abre el archivo de Figma que contiene los estilos que quieres extraer
2. Ejecuta el plugin desde `Plugins` > `Development` > `Vistral Design System Token Extractor`
3. Haz clic en "Extract Tokens"
4. Los tokens se mostrarán en formato JSON
5. Copia el JSON y guárdalo en `src/tokens/vistral-tokens.json` o úsalo con el sistema de sincronización

## Desarrollo

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Modo watch (recompila automáticamente)
npm run watch
```

## Estructura de Tokens Extraídos

El plugin extrae:

- **Colors**: De Paint Styles (FILL styles)
  - Organizados por categoría (primary, semantic, component)
  - Nombres normalizados a kebab-case

- **Typography**: De Text Styles
  - Font families
  - Font sizes
  - Font weights
  - Line heights

- **Shadows**: De Effect Styles
  - Drop shadows e inner shadows
  - Formato: `x y blur spread color`

## Convenciones de Nombres

Los estilos deben seguir esta convención para una mejor organización:

- **Colors**: `Colors/Primary/500` o `Colors/Semantic/Success`
- **Typography**: `Text Styles/Heading/H1` o `Text Styles/Body/Regular`
- **Shadows**: `Effects/Elevation/Medium` o `Effects/Shadow/Small`

El plugin parsea estos nombres y organiza los tokens automáticamente.
