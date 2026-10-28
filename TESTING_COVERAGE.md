# Cobertura de Testing - SonidoVivo

## Entorno
- Framework de pruebas: **Jasmine + Karma**
- Configuración: `karma.conf.cjs`
- Compilación de tests: `tsconfig.test.json`
- Comando: `npm run test:karma`

## Pruebas implementadas (10/10)

### Auth (4)
1. Registra un usuario
2. Inicia sesión con credenciales correctas
3. Rechaza credenciales incorrectas
4. No encuentra usuario inexistente

### Carrito (3)
5. Agrega un producto al carrito
6. Incrementa cantidad si el producto ya existe
7. Vacía el carrito

### Stock (3)
8. Permite agregar si hay stock disponible
9. No permite agregar si se alcanzó el stock
10. No permite agregar si no hay stock

## Mocks
- `localStorage.clear()` en `beforeEach` para aislar pruebas.

## Resultado
```
TOTAL: 10 SUCCESS
```
