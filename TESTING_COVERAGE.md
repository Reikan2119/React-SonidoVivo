# Cobertura de Testing - SonidoVivo

## Entorno
- Framework de pruebas: **Vitest**
- Configuración: `vitest.config.ts` (entorno jsdom)
- Comando: `npm run test`

## Pruebas implementadas (15)

### Auth (3)
1. Registra y encuentra un usuario
2. Rechaza credenciales incorrectas
3. Lista usuarios registrados

### Carrito (3)
4. Agrega un producto
5. Incrementa cantidad si ya existe
6. Vacía el carrito

### Stock (5)
7. Retorna stock por defecto si no hay override
8. Retorna stock sobrescrito si existe
9. Permite agregar si hay stock disponible
10. No permite agregar si se alcanzó el stock
11. No permite agregar si no hay stock

### Componentes (4)
12. El boton muestra el texto Ver producto
13. El boton enlaza a la pagina ver producto
14. La tarjeta muestra el titulo del producto
15. La tarjeta muestra el precio del producto

## Mocks
- `localStorage.clear()` en `beforeEach` para aislar pruebas.
- `MemoryRouter` para componentes con enrutamiento.

## Resultado
```
Test Files  5 passed (5)
Tests  15 passed (15)
```