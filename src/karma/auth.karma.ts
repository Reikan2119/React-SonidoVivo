import { registrarUsuario, loginUsuario, getUsuarios } from "../utils/auth.js";

describe("Auth (Jasmine)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("registra un usuario", () => {
    registrarUsuario({ nombre: "Ana", apellido: "Paz", email: "ana@test.com", password: "1234" });
    expect(getUsuarios().length).toBe(1);
  });

  it("inicia sesion con credenciales correctas", () => {
    registrarUsuario({ nombre: "Ana", apellido: "Paz", email: "ana@test.com", password: "1234" });
    const u = loginUsuario("ana@test.com", "1234");
    expect(u).not.toBeNull();
    expect(u.nombre).toBe("Ana");
  });

  it("rechaza credenciales incorrectas", () => {
    registrarUsuario({ nombre: "Ana", apellido: "Paz", email: "ana@test.com", password: "1234" });
    const u = loginUsuario("ana@test.com", "wrong");
    expect(u).toBeNull();
  });

  it("no encuentra usuario inexistente", () => {
    const u = loginUsuario("no@existe.com", "1234");
    expect(u).toBeNull();
  });
});