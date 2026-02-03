# Instalación del Plugin - Guía Paso a Paso

## Paso 1: Abrir Figma Desktop ✅
- Abre la aplicación Figma Desktop (no el navegador web)
- Si no la tienes, descárgala desde: https://www.figma.com/downloads/

## Paso 2: Abrir tu archivo de Figma
- Abre el archivo que contiene tus estilos de diseño
- Ejemplo: https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero

## Paso 3: Importar el Plugin

### Opción A: Desde el menú
1. En Figma Desktop, ve al menú superior
2. Click en **Plugins**
3. Click en **Development**
4. Click en **Import plugin from manifest...**
5. Navega a la carpeta del plugin:
   ```
   /Users/angelvanegas/Desktop/new project/vistral-design-system/figma-plugin/
   ```
6. Selecciona el archivo **manifest.json**
7. Click en **Open**

### Opción B: Arrastrar y soltar
1. Abre Finder y navega a:
   ```
   /Users/angelvanegas/Desktop/new project/vistral-design-system/figma-plugin/
   ```
2. Arrastra el archivo **manifest.json** a la ventana de Figma Desktop

## Paso 4: Ejecutar el Plugin

1. Una vez importado, ve al menú:
   - **Plugins** > **Development** > **Vistral Design System Token Extractor**
2. Se abrirá una ventana del plugin con la interfaz

## Paso 5: Extraer Tokens

1. En la ventana del plugin, verás un botón **"Extract Tokens"**
2. Haz click en el botón
3. Espera unos segundos mientras el plugin extrae los tokens
4. Verás:
   - Estadísticas (número de colores, tipografía, sombras)
   - El JSON completo en el área de texto

## Paso 6: Copiar y Guardar

1. Haz click en el botón **"Copy JSON"** para copiar al portapapeles
2. O selecciona y copia manualmente el contenido del área de texto
3. Guarda el contenido en:
   ```
   src/tokens/vistral-tokens.json
   ```

## Solución de Problemas

### El plugin no aparece en el menú
- Asegúrate de haber importado el `manifest.json` correctamente
- Verifica que `code.js` existe en la misma carpeta
- Intenta reiniciar Figma Desktop

### Error al ejecutar el plugin
- Verifica que tienes estilos creados en Figma
- Asegúrate de que el archivo de Figma está abierto
- Revisa la consola de Figma (Plugins > Development > Open Console)

### No se extraen tokens
- Verifica que tienes Paint Styles, Text Styles o Effect Styles en tu archivo
- Los estilos deben estar publicados o ser locales
- Revisa que los nombres de estilos sigan la convención: `Category/Subcategory/Name`

## Convenciones de Nombres Recomendadas

Para mejor organización, nombra tus estilos así:

- **Colors**: `Colors/Primary/500` o `Colors/Semantic/Success`
- **Typography**: `Text Styles/Heading/H1` o `Text Styles/Body/Regular`
- **Shadows**: `Effects/Elevation/Medium` o `Effects/Shadow/Small`

El plugin parsea estos nombres automáticamente y organiza los tokens.
