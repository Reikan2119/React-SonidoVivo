import { puedeAgregar } from "../utils/stock.js";

describe("Stock (Jasmine)", () => {
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