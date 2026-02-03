# Vistral Design System

Sistema de diseño React con componentes sincronizados desde Figma.

## 📦 Instalación

### Opción 1: NPM (Recomendado)

```bash
npm install @vistral/design-system
```

### Opción 2: Desde GitHub

```bash
npm install git+https://github.com/tu-org/vistral-design-system.git
```

### Opción 3: Link local (desarrollo)

```bash
# En el directorio del design system
npm link

# En tu proyecto
npm link @vistral/design-system
```

## 🚀 Uso básico

```tsx
import { Button, Card, Input, PropertyCard } from '@vistral/design-system';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="tu@email.com" />
      <Button>Enviar</Button>
    </Card>
  );
}
```

## 📚 Componentes disponibles

### Básicos
- `Button` - Botones con variantes (primary, secondary, ghost, destructive)
- `Card` - Contenedor con header, body, footer
- `Badge` - Etiquetas de estado
- `Avatar` - Imágenes de perfil
- `Alert` - Mensajes de alerta
- `Divider` - Separadores
- `Link` - Enlaces estilizados

### Formularios
- `Input` - Campo de texto
- `Textarea` - Área de texto
- `Checkbox` - Casillas de verificación
- `Switch` - Interruptores
- `Radio` - Botones de radio
- `Select` - Selectores
- `Combobox` - Select con búsqueda
- `Autocomplete` - Input con sugerencias
- `Slider` - Control deslizante
- `DatePicker` - Selector de fecha
- `PhoneInput` - Input de teléfono internacional
- `PinCode` - Input de código PIN
- `TagInput` - Input de etiquetas múltiples
- `NumberInput` - Input numérico con +/-
- `SearchInput` - Campo de búsqueda
- `ColorPicker` - Selector de color
- `FileUpload` - Subida de archivos

### Feedback
- `Progress` - Barras de progreso
- `Skeleton` - Placeholders de carga
- `Toast` - Notificaciones temporales
- `EmptyState` - Estados vacíos
- `Tooltip` - Tooltips informativos
- `Banner` - Banners de notificación

### Navegación
- `Navbar` - Barra de navegación superior
- `BottomNav` - Navegación inferior (mobile)
- `Tabs` - Pestañas
- `Breadcrumb` - Migas de pan
- `Pagination` - Paginación
- `SideNav` - Navegación lateral
- `Stepper` - Wizard de pasos

### Overlays
- `Dialog` - Diálogos modales
- `Popover` - Popovers flotantes
- `DropdownMenu` - Menús desplegables
- `ContextMenu` - Menú contextual
- `Sheet` - Panel lateral deslizante

### Layout
- `Accordion` - Acordeones
- `Table` - Tablas de datos
- `List` / `ListItem` - Listas
- `Carousel` - Carrusel de imágenes
- `DataBlock` - Bloques de KPIs
- `PageHeader` / `SectionHeader` - Encabezados
- `FooterActions` - Acciones de pie
- `Timeline` - Línea de tiempo
- `ToggleGroup` - Grupos de toggle

### Especiales
- `Chip` - Chips/Tags
- `Rating` - Estrellas de valoración
- `Calendar` - Calendario
- `Lightbox` - Visor de imágenes
- `MediaHero` - Hero de galería de fotos
- `PropertyCard` - Tarjeta de propiedad inmobiliaria

## 🎨 Tokens de diseño

### Usar tokens CSS

```tsx
import '@vistral/design-system/tokens.css';
```

### Usar tokens en JS

```tsx
import { BUTTON_TOKENS, CARD_TOKENS } from '@vistral/design-system';

// Acceder a valores específicos
console.log(BUTTON_TOKENS.primary.bg); // '#2050f6'
```

## 📖 Storybook

Ver documentación interactiva:

```bash
# Clonar el repositorio
git clone https://github.com/tu-org/vistral-design-system.git
cd vistral-design-system

# Instalar dependencias
npm install

# Iniciar Storybook
npm run storybook
```

Abre http://localhost:6006

## 🔧 Desarrollo

### Requisitos
- Node.js 18+
- React 19+

### Comandos

```bash
# Desarrollo con watch
npm run dev

# Build de producción
npm run build

# Storybook
npm run storybook

# Build Storybook estático
npm run build-storybook

# Type check
npm run typecheck
```

### Estructura del proyecto

```
vistral-design-system/
├── src/
│   ├── components/
│   │   └── ui/           # Componentes React
│   ├── tokens/           # Design tokens
│   └── index.ts          # Exports principales
├── stories/              # Stories de Storybook
├── lib/
│   └── figma-sync/       # Sincronización con Figma
└── dist/                 # Build de producción
```

## 📝 Ejemplo completo

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Badge,
} from '@vistral/design-system';

function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacto</CardTitle>
        <Badge variant="success">Nuevo</Badge>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input 
            label="Nombre" 
            placeholder="Tu nombre" 
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="tu@email.com" 
          />
          <Select>
            <SelectTrigger placeholder="Selecciona un tema" />
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="soporte">Soporte</SelectItem>
              <SelectItem value="ventas">Ventas</SelectItem>
            </SelectContent>
          </Select>
          <Button>Enviar mensaje</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## 🏠 PropertyCard (Inmobiliaria)

```tsx
import { PropertyCard } from '@vistral/design-system';

<PropertyCard
  image="https://example.com/property.jpg"
  type="Apartment"
  title="Property in Navacerrada"
  status="available"
  location="Madrid, Spain"
  category="Flat"
  bedrooms={2}
  bathrooms={1}
  area={85}
  price={90000}
  yieldPercent={6}
  infoRows={[
    { label: 'Estimated rent', value: '650€/month' },
    { label: 'Total investment', value: '113,100€' },
    { label: 'Capital gain', value: '90.000€', hasInfo: true },
  ]}
  onFavoriteChange={(isFav) => console.log('Favorite:', isFav)}
  onCardClick={() => console.log('Card clicked')}
/>
```

## 📄 Licencia

Privado - Vistral Lab © 2024
