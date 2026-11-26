# Informe de pruebas — Frontend SonidoVivo

## Entorno
- Vitest 5 + Testing Library + jsdom.
- Configuración en `vitest.config.ts`.

## Pruebas existentes (7 en 3 archivos)

| Archivo | Descripción |
|---|---|
| `src/test/Boton.test.tsx` | Renderizado del botón "Ver producto". |
| `src/test/CardProducto.test.tsx` | Renderizado de tarjeta de producto (título y precio). |
| `src/test/FormularioContacto.test.tsx` | Validación y envío del formulario de contacto. |

## Ejecución
```
npm run test
```
Resultado actual: 3 archivos, 7 tests, todos pasando.