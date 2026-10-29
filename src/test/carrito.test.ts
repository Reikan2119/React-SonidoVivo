import { describe, it, expect, beforeEach } from "vitest";
import { addToCarrito, getCarrito, vaciarCarrito } from "../componentes/paginas/paginaCarrito";

describe("carrito", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega un producto", () => {
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    const c = getCarrito();
    expect(c.length).toBe(1);
    expect(c[0].cantidad).toBe(1);
  });

  it("incrementa cantidad si ya existe", () => {
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    const c = getCarrito();
    expect(c[0].cantidad).toBe(2);
  });

  it("vacía el carrito", () => {
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    vaciarCarrito();
    expect(getCarrito().length).toBe(0);
  });
});
