// Dirección del API Gateway. React SOLO habla con el Gateway (puerto 8080) y él reparte
// cada petición al microservicio que corresponde (usuarios, productos, pedidos, carrito, mensajeria).
export const API = "http://localhost:8080/api";

// Saca el mensaje de error que manda Spring ({"message": "..."}); si no hay, usa el mensaje por defecto.
export async function leerError(respuesta: Response, porDefecto: string): Promise<string> {
  try {
    const datos = await respuesta.json();
    return datos?.message || porDefecto;
  } catch {
    return porDefecto;
  }
}
