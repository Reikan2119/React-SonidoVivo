

export const API = "http://localhost:8080/api";

export async function leerError(respuesta: Response, porDefecto: string): Promise<string> {
  try {
    const datos = await respuesta.json();
    return datos?.message || porDefecto;
  } catch {
    return porDefecto;
  }
}