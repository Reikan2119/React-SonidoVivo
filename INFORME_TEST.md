# Informe de Pruebas Unitarias - SonidoVivo

Framework: **Vitest** (entorno jsdom)  
Comando: `npm run test`  
Resultado global: **15/15 pruebas pasando**

---

## 1. Auth - Registra y encuentra un usuario
**Descripción:** Verifica que un usuario se registre y pueda iniciar sesión.
**Código:**
```ts
registrarUsuario({ nombre: "Ana", apellido: "Paz", email: "ana@test.com", password: "1234" });
const u = loginUsuario("ana@test.com", "1234");
expect(u).not.toBeNull();
```
**Resultado esperado (éxito):** Usuario encontrado, nombre "Ana".  
**Resultado con falla:** `null` o error de autenticación.

## 2. Auth - Rechaza credenciales incorrectas
**Descripción:** Verifica que credenciales inválidas no inicien sesión.
**Código:**
```ts
const u = loginUsuario("ana@test.com", "wrong");
expect(u).toBeNull();
```
**Resultado esperado (éxito):** `null`.  
**Resultado con falla:** Usuario retornado (brecha de seguridad).

## 3. Auth - Lista usuarios registrados
**Descripción:** Verifica que se liste el número correcto de usuarios.
**Código:**
```ts
registrarUsuario({ nombre: "A", apellido: "B", email: "a@b.com", password: "1" });
expect(getUsuarios().length).toBe(1);
```
**Resultado esperado (éxito):** Longitud 1.  
**Resultado con falla:** 0 o valor distinto.

## 4. Carrito - Agrega un producto
**Descripción:** Verifica que un producto se agregue al carrito.
**Código:**
```ts
addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
expect(getCarrito().length).toBe(1);
```
**Resultado esperado (éxito):** 1 item en carrito.  
**Resultado con falla:** 0 items.

## 5. Carrito - Incrementa cantidad si ya existe
**Descripción:** Verifica que agregar el mismo producto incremente cantidad.
**Código:**
```ts
addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
expect(getCarrito()[0].cantidad).toBe(2);
```
**Resultado esperado (éxito):** Cantidad 2.  
**Resultado con falla:** Cantidad 1 o error.

## 6. Carrito - Vacía el carrito
**Descripción:** Verifica que vaciar el carrito lo deje vacío.
**Código:**
```ts
addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
vaciarCarrito();
expect(getCarrito().length).toBe(0);
```
**Resultado esperado (éxito):** 0 items.  
**Resultado con falla:** Items restantes.

## 7. Stock - Retorna stock por defecto
**Descripción:** Verifica que sin override se use el stock por defecto.
**Código:**
```ts
expect(getStock(1, 5)).toBe(5);
```
**Resultado esperado (éxito):** 5.  
**Resultado con falla:** Valor distinto.

## 8. Stock - Retorna stock sobrescrito
**Descripción:** Verifica que un override de stock se respete.
**Código:**
```ts
setStock(1, 2);
expect(getStock(1, 5)).toBe(2);
```
**Resultado esperado (éxito):** 2.  
**Resultado con falla:** 5 (ignora override).

## 9. Stock - Permite agregar si hay stock
**Descripción:** Verifica que se pueda agregar si hay stock disponible.
**Código:**
```ts
expect(puedeAgregar(5, 2)).toBe(true);
```
**Resultado esperado (éxito):** `true`.  
**Resultado con falla:** `false`.

## 10. Stock - No permite agregar si se alcanzó el stock
**Descripción:** Verifica bloqueo al alcanzar el stock.
**Código:**
```ts
expect(puedeAgregar(5, 5)).toBe(false);
```
**Resultado esperado (éxito):** `false`.  
**Resultado con falla:** `true`.

## 11. Stock - No permite agregar si no hay stock
**Descripción:** Verifica bloqueo sin stock.
**Código:**
```ts
expect(puedeAgregar(0, 0)).toBe(false);
```
**Resultado esperado (éxito):** `false`.  
**Resultado con falla:** `true`.

## 12. Componente Boton - Muestra texto
**Descripción:** Verifica que el botón muestre "Ver producto".
**Código:**
```tsx
render(<MemoryRouter><Boton id={3} /></MemoryRouter>);
expect(screen.getByText("Ver producto")).toBeInTheDocument();
```
**Resultado esperado (éxito):** Texto visible.  
**Resultado con falla:** No renderiza.

## 13. Componente Boton - Enlace correcto
**Descripción:** Verifica que el botón enlace a `/producto/3`.
**Código:**
```tsx
expect(screen.getByText("Ver producto")).toHaveAttribute("href", "/producto/3");
```
**Resultado esperado (éxito):** `href="/producto/3"`.  
**Resultado con falla:** href distinto.

## 14. Componente CardProducto - Muestra título
**Descripción:** Verifica que la tarjeta muestre el título.
**Código:**
```tsx
render(<MemoryRouter><CardProducto id={1} titulo="Guitarra Test" descripcion="desc" precio={1000} imagen="/img/test.png" stock={5} /></MemoryRouter>);
expect(screen.getByText("Guitarra Test")).toBeInTheDocument();
```
**Resultado esperado (éxito):** Título visible.  
**Resultado con falla:** No renderiza.

## 15. Componente CardProducto - Muestra precio
**Descripción:** Verifica que la tarjeta muestre el precio formateado.
**Código:**
```tsx
expect(screen.getByText("$1.000")).toBeInTheDocument();
```
**Resultado esperado (éxito):** "$1.000" visible.  
**Resultado con falla:** No aparece.

---

## Resultado global
```
Test Files  5 passed (5)
Tests  15 passed (15)
```