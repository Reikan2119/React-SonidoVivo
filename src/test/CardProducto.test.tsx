// @vitest-environment jsdom
import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CardProducto from "../componentes/moleculas/CardProducto";
import { MemoryRouter } from "react-router-dom";

afterEach(() => cleanup());

test("La tarjeta muestra el titulo del producto", () => {
  render(
    <MemoryRouter>
      <CardProducto id={1} titulo="Guitarra Test" descripcion="desc" precio={1000} imagen="/img/test.png" stock={5} />
    </MemoryRouter>
  );
  expect(screen.getByText("Guitarra Test")).toBeInTheDocument();
});

test("La tarjeta muestra el precio del producto", () => {
  render(
    <MemoryRouter>
      <CardProducto id={1} titulo="Guitarra Test" descripcion="desc" precio={1000} imagen="/img/test.png" stock={5} />
    </MemoryRouter>
  );
  expect(screen.getByText("$1.000")).toBeInTheDocument();
});