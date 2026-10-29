import { describe, it, expect, beforeEach } from "vitest";
import { registrarUsuario, loginUsuario, getUsuarios } from "../paginas/paginaLogin";

describe("auth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("registra y encuentra un usuario", () => {
    registrarUsuario({ nombre: "Ana", apellido: "Paz", email: "ana@test.com", password: "1234" });
    const u = loginUsuario("ana@test.com", "1234");
    expect(u).not.toBeNull();
    expect(u?.nombre).toBe("Ana");
  });

  it("rechaza credenciales incorrectas", () => {
    registrarUsuario({ nombre: "Ana", apellido: "Paz", email: "ana@test.com", password: "1234" });
    const u = loginUsuario("ana@test.com", "wrong");
    expect(u).toBeNull();
  });

  it("lista usuarios registrados", () => {
    registrarUsuario({ nombre: "A", apellido: "B", email: "a@b.com", password: "1" });
    expect(getUsuarios().length).toBe(1);
  });
});
