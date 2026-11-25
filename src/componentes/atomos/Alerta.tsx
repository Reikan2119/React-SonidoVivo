import type { ReactNode } from "react";

type TipoAlerta = "error" | "exito" | "info";

interface AlertaProps {
  tipo?: TipoAlerta;
  children: ReactNode;
  className?: string;
}

const ESTILOS: Record<TipoAlerta, { backgroundColor: string; border: string; color: string }> = {
  error: { backgroundColor: "#3a1f1f", border: "1px solid #dc3545", color: "#ffb3b3" },
  exito: { backgroundColor: "#1f3d2b", border: "1px solid #4caf50", color: "#b9f6ca" },
  info: { backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" },
};

function Alerta({ tipo = "info", children, className = "" }: AlertaProps) {
  return (
    <div
      className={`alert py-2 px-3 mb-3 ${className}`.trim()}
      role={tipo === "exito" ? "status" : "alert"}
      style={{ ...ESTILOS[tipo], borderRadius: "0.375rem" }}
    >
      {children}
    </div>
  );
}

export default Alerta;