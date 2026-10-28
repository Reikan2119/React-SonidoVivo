# Cobertura de Testing - SonidoVivo

## Entorno
- Framework de pruebas: **Vitest**
- Configuración: `vitest.config.ts` (entorno jsdom)
- Comando: `npm run test`

## Pruebas implementadas (11)

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

## Mocks
- `localStorage.clear()` en `beforeEach` para aislar pruebas.

## Resultado
```
Test Files  3 passed (3)
Tests  11 passed (11)
```