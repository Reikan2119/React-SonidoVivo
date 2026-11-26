# SonidoVivo — Frontend (React)

Aplicación web (SPA) para la tienda de instrumentos musicales SonidoVivo.
Construida con React 19, TypeScript, Vite 8, React Router 7, Bootstrap 5 y Vitest + Testing Library.

## Estructura

Organizada con Atomic Design:

```
src/
├── api/            # Llamadas al backend (Gateway en localhost:8080/api)
├── componentes/
│   ├── atomos/
│   ├── moleculas/
│   └── organismos/
├── paginas/
└── test/
```

## Páginas

Públicas: Inicio, Productos, Detalle de producto, Nosotros, Contacto, Carrito, Login, Registro.
Protegidas: Mis pedidos, y Panel Admin (Productos, Pedidos, Mensajes, Usuarios).

## Sesión

Se guarda en `sessionStorage` (no `localStorage`).

## Scripts

- `npm run dev` — servidor de desarrollo (http://localhost:5173).
- `npm run build` — compilación de producción.
- `npm run test` — pruebas (7 tests en 3 archivos).
- `npm run lint` — lint.

## Backend

El frontend consume los microservicios a través del API Gateway en `http://localhost:8080/api`.
Ver el repositorio de backend para la guía de arranque.