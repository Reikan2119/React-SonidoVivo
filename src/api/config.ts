

export const API = "http://localhost:8080/api";

export async function leerError(respuesta: Response, porDefecto: string): Promise<string> {
  try {
    const datos = await respuesta.json();
    return datos?.message || porDefecto;
  } catch {
    return porDefecto;
  }
}

export function mensajeError(error: unknown, porDefecto: string): string {
  if (error instanceof Error) {
    const texto = error.message.trim();
    if (texto === "" || texto.toLowerCase() === "failed to fetch") {
      return "No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.";
    }
    return texto;
  }
  return porDefecto;
}