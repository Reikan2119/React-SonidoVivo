# SonidoVivo

Tienda de instrumentos musicales construida con **React**, **TypeScript** y **Vite**, organizada con **Atomic Design**.

## Tecnologías

- React 19
- TypeScript
- Vite
- React Router
- Bootstrap 5
- Vitest + Testing Library

## Estructura del proyecto

```
src/
├── componentes/
│   ├── atomos/        # Elementos mínimos: Alerta, Boton, BotonComprar, BotonVolver
│   ├── moleculas/     # Combinaciones de átomos: CardProducto, CampoFormulario, TarjetaContenido...
│   └── organismos/    # Secciones completas: Navbar, formularios, SeccionCatalogo
│       └── nosotros/  # Organismos específicos de la página Nosotros
├── datos/             # Catálogo de productos y contenido de Nosotros
├── estilos/           # CSS por dominio: formularios.css, nosotros.css
├── paginas/           # Composición de organismos por ruta
├── servicios/         # Lógica de auth, carrito y stock sobre localStorage
├── test/              # Pruebas unitarias y de componentes
├── tipos/             # Interfaces y tipos compartidos
└── utilidades/        # Funciones reutilizables (validación)
```

### Flujo de dependencias

`paginas → organismos → moléculas → átomos`

Las páginas solo componen organismos. Los organismos consumen datos y servicios, las moléculas reutilizan átomos y los átomos no dependen de otras capas.

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilación de TypeScript + build de Vite
npm run test     # Pruebas con Vitest
npm run lint     # Análisis con ESLint
npm run preview  # Vista previa del build
```

## Rutas principales

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio, categorías y productos destacados |
| `/productos` | Catálogo completo con filtros por sección |
| `/producto/:id` | Detalle de producto |
| `/nosotros` | Historia, valores, servicios y equipo |
| `/contacto` | Formulario de contacto con validación |
| `/carrito` | Carrito y compra |
| `/login`, `/registro`, `/perfil` | Autenticación y perfil |
| `/admin` | Panel de administración de stock |

## Pruebas

El proyecto cuenta con **20 pruebas** distribuidas en 6 archivos. Revisa `INFORME_TEST.md` y `TESTING_COVERAGE.md` para el detalle.

```bash
npm run test
```
