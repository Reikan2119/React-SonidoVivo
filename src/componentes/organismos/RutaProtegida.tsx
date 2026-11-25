import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { esAdmin, obtenerUsuario } from "../../api/sesion";

type Props = {
  children: ReactNode;
  soloAdmin?: boolean;
};

function RutaProtegida({ children, soloAdmin = false }: Props) {
  const usuario = obtenerUsuario();
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  if (soloAdmin && !esAdmin(usuario)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default RutaProtegida;
