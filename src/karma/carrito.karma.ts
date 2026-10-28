import { addToCarrito, getCarrito, vaciarCarrito } from "../utils/carrito.js";

describe("Carrito (Jasmine)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega un producto al carrito", () => {
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    expect(getCarrito().length).toBe(1);
  });

  it("incrementa cantidad si el producto ya existe", () => {
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    expect(getCarrito()[0].cantidad).toBe(2);
  });

  it("vacia el carrito", () => {
    addToCarrito({ id: 1, titulo: "Guitarra", precio: 100, imagen: "img.png" });
    vaciarCarrito();
    expect(getCarrito().length).toBe(0);
  });
});