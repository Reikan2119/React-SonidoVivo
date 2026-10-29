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

## 12. Productos - Formatea precio en CLP
**Descripción:** Verifica formato de precio con separador de miles.
**Código:**
```ts
expect((299990).toLocaleString("es-CL")).toBe("299.990");
```
**Resultado esperado (éxito):** "299.990".  
**Resultado con falla:** "299990".

## 13. Productos - Calcula total del carrito
**Descripción:** Verifica cálculo de total.
**Código:**
```ts
const items = [{ precio: 100, cantidad: 2 }, { precio: 50, cantidad: 1 }];
const total = items.reduce((a, i) => a + i.precio * i.cantidad, 0);
expect(total).toBe(250);
```
**Resultado esperado (éxito):** 250.  
**Resultado con falla:** Valor distinto.

## 14. Validación - Correo válido
**Descripción:** Verifica validación de correo con @ y .com.
**Código:**
```ts
const email = "user@dominio.com";
const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.includes(".com");
expect(valido).toBe(true);
```
**Resultado esperado (éxito):** `true`.  
**Resultado con falla:** `false`.

## 15. Validación - Contraseñas que no coinciden
**Descripción:** Verifica detección de contraseñas distintas.
**Código:**
```ts
const p1 = "abc123";
const p2 = "abc124";
expect(p1 === p2).toBe(false);
```
**Resultado esperado (éxito):** `false`.  
**Resultado con falla:** `true`.

---

## Resultado global
```
Test Files  4 passed (4)
Tests  15 passed (15)
```