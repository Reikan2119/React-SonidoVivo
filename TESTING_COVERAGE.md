# Cobertura de Testing - SonidoVivo

## Entorno
- Framework de pruebas: **Vitest**
- Configuración: `vitest.config.ts` (entorno jsdom)
- Comando: `npm run test`

## Pruebas implementadas (20)

### Auth (5)
1. Registra y encuentra un usuario
2. Rechaza credenciales incorrectas
3. Lista usuarios registrados
4. Detecta un correo ya registrado sin distinguir mayúsculas
5. Permite iniciar sesión ignorando mayúsculas y espacios del correo

### Carrito (3)
6. Agrega un producto
7. Incrementa cantidad si ya existe
8. Vacía el carrito

### Stock (5)
9. Retorna stock por defecto si no hay override
10. Retorna stock sobrescrito si existe
11. Permite agregar si hay stock disponible
12. No permite agregar si se alcanzó el stock
13. No permite agregar si no hay stock

### Componentes (4)
14. El boton muestra el texto Ver producto
15. El boton enlaza a la pagina ver producto
16. La tarjeta muestra el titulo del producto
17. La tarjeta muestra el precio del producto

### Formulario de contacto (3)
18. Muestra errores en rojo al enviar vacío
19. Rechaza campos que solo contienen espacios
20. Envía correctamente cuando todos los campos son válidos

## Mocks
- `localStorage.clear()` en `beforeEach` para aislar pruebas.
- `MemoryRouter` para componentes con enrutamiento.

## Resultado
```
Test Files  6 passed (6)
Tests  20 passed (20)
```