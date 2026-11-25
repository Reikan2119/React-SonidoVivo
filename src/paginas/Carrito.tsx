import { API, leerError } from "../api/config";
import { mensajeError } from "../api/config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerUsuario } from "../api/sesion";
import {
  cambiarCantidad,
  obtenerCarrito,
  quitarDelCarrito,
  vaciarCarrito,
  type CarritoDatos,
  type ItemCarrito,
} from "../api/carrito";

function Carrito() {
  const navegacion = useNavigate();
  const usuario = obtenerUsuario();
  const usuarioId = usuario?.id;

  const [carrito, setCarrito] = useState<CarritoDatos | null>(null);
  const [cargando, setCargando] = useState(true);
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("TARJETA");
  const [tipoEntrega, setTipoEntrega] = useState("DESPACHO");
  const [pagando, setPagando] = useState(false);

  useEffect(() => {
    if (!usuarioId) { setCargando(false); return; }
    obtenerCarrito(usuarioId)
      .then((datos) => setCarrito(datos))
      .catch(() => alert("No se pudo cargar el carrito"))
      .finally(() => setCargando(false));
  }, [usuarioId]);

  if (!usuarioId) {
    return (
      <div className="pagina pagina-carrito">
        <header className="encabezado-pagina">
          <div className="container">
            <h1>Carrito de Compras</h1>
          </div>
        </header>
        <div className="container pb-5">
          <div className="panel-sonido panel-vacio">
            <p className="mb-4">Inicia sesión para ver tu carrito.</p>
            <Link to="/login" className="btn btn-warning fw-bold px-4">Iniciar sesión</Link>
          </div>
        </div>
      </div>
    );
  }

  const items: ItemCarrito[] = carrito?.items ?? [];

  const actualizar = async (accion: () => Promise<CarritoDatos>) => {
    try {
      setCarrito(await accion());
      window.dispatchEvent(new Event("carritoActualizado"));
    } catch (error) {
      alert(mensajeError(error, "No se pudo actualizar el carrito"));
    }
  };

  const eliminar = (productoId: number) => actualizar(() => quitarDelCarrito(usuarioId, productoId));
  const cambiar = (item: ItemCarrito, cantidad: number) =>
    actualizar(() => cambiarCantidad(usuarioId, item.productoId, cantidad));
  const vaciar = async () => {
    try {
      await vaciarCarrito(usuarioId);
      setCarrito({ usuarioId, items: [], total: 0 });
      window.dispatchEvent(new Event("carritoActualizado"));
    } catch (error) {
      alert(mensajeError(error, "No se pudo vaciar el carrito"));
    }
  };

  const pagar = async () => {
    if (pagando) return;
    if (tipoEntrega === "DESPACHO" && direccion.trim() === "") { alert("Debe ingresar la dirección de entrega"); return; }
    setPagando(true);
    const descontados: ItemCarrito[] = [];
    try {
      for (const p of items) {
        const res = await fetch(`${API}/productos/${p.productoId}/descontar?cantidad=${p.cantidad}`, { method: "PUT" });
        if (!res.ok) throw new Error(await leerError(res, `No hay stock suficiente de ${p.nombre}`));
        descontados.push(p);
      }
      const res = await fetch(`${API}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId,
          tipoEntrega,
          direccionEntrega: tipoEntrega === "DESPACHO" ? direccion.trim() : "",
          metodoPago,
          items: items.map((p) => ({ productoId: p.productoId, cantidad: p.cantidad })),
        }),
      });
      if (!res.ok) throw new Error(await leerError(res, "No se pudo registrar el pedido"));
      const pedido = await res.json();
      descontados.length = 0;
      await vaciarCarrito(usuarioId).catch((e) => console.error("No se pudo vaciar el carrito:", e));
      setCarrito({ usuarioId, items: [], total: 0 });
      window.dispatchEvent(new Event("carritoActualizado"));
      alert(`La compra fue realizada con exito. Pedido N° ${pedido.id}`);
      navegacion("/mis-pedidos");
    } catch (error) {
      await Promise.all(
        descontados.map((p) =>
          fetch(`${API}/productos/${p.productoId}/reponer?cantidad=${p.cantidad}`, { method: "PUT" }).catch(() => undefined)
        )
      );
      console.error("Error al pagar:", error);
      alert(mensajeError(error, "No se pudo conectar con el servidor. Intente nuevamente."));
    } finally {
      setPagando(false);
    }
  };

  return (
    <div className="pagina pagina-carrito">
      <header className="encabezado-pagina">
        <div className="container">
          <h1>Carrito de Compras</h1>
        </div>
      </header>

      <div className="container pb-5">
        {cargando ? (
          <p className="estado-carga">Cargando...</p>
        ) : items.length === 0 ? (
          <div className="panel-sonido panel-vacio">
            <p className="mb-4">El carrito está vacío.</p>
            <Link to="/productos" className="btn btn-warning fw-bold px-4">Volver al catálogo</Link>
          </div>
        ) : (
          <div className="panel-sonido">
            <div className="table-responsive">
              <table className="table tabla-sonido align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th style={{ width: "120px" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.productoId}>
                      <td>
                        <div className="carrito-producto">
                          <img src={p.imagen} alt={p.nombre} className="carrito-imagen" />
                          <span>{p.nombre}</span>
                        </div>
                      </td>
                      <td>${p.precio.toLocaleString("es-CL")}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-outline-secondary btn-sm btn-cantidad" onClick={() => cambiar(p, p.cantidad - 1)} disabled={pagando}>−</button>
                          <span>{p.cantidad}</span>
                          <button className="btn btn-outline-secondary btn-sm btn-cantidad" onClick={() => cambiar(p, p.cantidad + 1)} disabled={pagando}>+</button>
                        </div>
                      </td>
                      <td>${p.subtotal.toLocaleString("es-CL")}</td>
                      <td><button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(p.productoId)}>Eliminar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row g-3 mt-1">
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="tipoEntrega">Tipo de entrega</label>
                <select id="tipoEntrega" className="form-select" value={tipoEntrega} onChange={(e) => setTipoEntrega(e.target.value)}>
                  <option value="DESPACHO">Despacho a domicilio</option>
                  <option value="RETIRO_TIENDA">Retiro en tienda</option>
                </select>
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="metodoPago">Método de pago</label>
                <select id="metodoPago" className="form-select" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                  <option value="TARJETA">Tarjeta</option>
                  <option value="TRANSFERENCIA">Transferencia</option>
                  <option value="EFECTIVO">Efectivo</option>
                </select>
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="direccion">Dirección de entrega</label>
                <input id="direccion" type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ej: Av. Providencia 1234, Santiago" disabled={tipoEntrega === "RETIRO_TIENDA"} />
              </div>
            </div>
            <div className="carrito-resumen">
              <button className="btn btn-outline-danger btn-sm" onClick={vaciar} disabled={pagando}>Vaciar Carrito</button>
              <h4 className="carrito-total">
                Total a pagar: <span>${(carrito?.total ?? 0).toLocaleString("es-CL")}</span>
              </h4>
              <button className="btn btn-warning fw-bold px-4" onClick={pagar} disabled={pagando}>
                {pagando ? "Procesando..." : "Pagar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;