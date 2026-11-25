import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import FormularioContacto from "../componentes/organismos/FormularioContacto";

afterEach(() => cleanup());

describe("FormularioContacto", () => {
  it("muestra errores en rojo cuando se envía vacío", () => {
    render(<FormularioContacto />);

    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByText("El nombre es obligatorio. Escribe cómo te llamas.")).toBeInTheDocument();
    expect(screen.getByText("El correo es obligatorio. Escribe tu correo electrónico.")).toBeInTheDocument();
    expect(
      screen.getByText("El mensaje es obligatorio. Cuéntanos en qué podemos ayudarte.")
    ).toBeInTheDocument();

    const nombre = screen.getByLabelText(/nombre/i);
    const correo = screen.getByLabelText(/correo/i);
    const mensaje = screen.getByLabelText(/mensaje/i);

    expect(nombre).toHaveClass("campo-error");
    expect(correo).toHaveClass("campo-error");
    expect(mensaje).toHaveClass("campo-error");
    expect(nombre).toHaveAttribute("aria-invalid", "true");
  });

  it("no acepta campos que solo contienen espacios", () => {
    render(<FormularioContacto />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "   " } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "   " } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByText("El nombre es obligatorio. Escribe cómo te llamas.")).toBeInTheDocument();
    expect(screen.getByText("El correo es obligatorio. Escribe tu correo electrónico.")).toBeInTheDocument();
    expect(
      screen.getByText("El mensaje es obligatorio. Cuéntanos en qué podemos ayudarte.")
    ).toBeInTheDocument();
  });

  it("envía correctamente cuando todos los campos son válidos", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, nombre: "Ana Pérez", email: "ana@correo.cl", asunto: "Consulta general", mensaje: "msg", estado: "PENDIENTE", fechaEnvio: "2024-01-01" }),
    }));

    render(<FormularioContacto />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana Pérez" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "ana@correo.cl" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Quisiera consultar por una guitarra acústica." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    await new Promise((r) => setTimeout(r, 0));

    expect(screen.getByText(/Mensaje enviado correctamente/)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toHaveValue("");
    expect(screen.getByLabelText(/correo/i)).toHaveValue("");
    expect(screen.getByLabelText(/mensaje/i)).toHaveValue("");

    vi.unstubAllGlobals();
  });
});