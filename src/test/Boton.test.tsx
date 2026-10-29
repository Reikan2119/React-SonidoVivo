// @vitest-environment jsdom
import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Boton from "../componentes/atomos/Boton";
import { MemoryRouter } from "react-router-dom";

afterEach(() => cleanup());

test("El boton muestra el texto Ver producto", () => {
  render(
    <MemoryRouter>
      <Boton id={3} />
    </MemoryRouter>
  );
  const boton = screen.getByText("Ver producto");
  expect(boton.textContent).toBe("Ver producto");
});

test("El boton enlaza a la pagina ver producto", () => {
  render(
    <MemoryRouter>
      <Boton id={3} />
    </MemoryRouter>
  );
  expect(screen.getByText("Ver producto")).toHaveAttribute("href", "/producto/3");
});