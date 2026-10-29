import { describe, it, expect, beforeEach } from "vitest";
import { puedeAgregar, getStock, setStock } from "../componentes/paginas/paginaCarrito";

describe("stock", () => {
  beforeEach(() => localStorage.clear());

  it("retorna stock por defecto si no hay override", () => {
    expect(getStock(1, 5)).toBe(5);
  });

  it("retorna stock sobrescrito si existe", () => {
    setStock(1, 2);
    expect(getStock(1, 5)).toBe(2);
  });

  it("permite agregar si hay stock disponible", () => {
    expect(puedeAgregar(5, 2)).toBe(true);
  });

  it("no permite agregar si se alcanzo el stock", () => {
    expect(puedeAgregar(5, 5)).toBe(false);
  });

  it("no permite agregar si no hay stock", () => {
    expect(puedeAgregar(0, 0)).toBe(false);
  });
});
