import { useState } from "react";
import { mensajeError } from "../../api/config";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { loginUsuario } from "../../api/usuarios";
import { guardarUsuario, type UsuarioSesion } from "../../api/sesion";

function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navegacion = useNavigate();

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviando) return;
    if (email.trim() === "") { alert("Debe ingresar su correo"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("Ingresar un correo valido"); return; }
    if (contraseña.trim() === "") { alert("Debe ingresar su contraseña"); return; }

    setEnviando(true);
    try {
      const usuario = await loginUsuario(email.trim(), contraseña);
      const sesion: UsuarioSesion = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol as UsuarioSesion["rol"],
      };
      guardarUsuario(sesion);
      if (usuario.rol === "ADMINISTRADOR") {
        alert("¡Acceso de administrador!");
        navegacion("/admin");
      } else {
        alert("¡Inicio de sesión exitoso!");
        navegacion("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(mensajeError(error, "No se pudo conectar con el servidor. Intente nuevamente."));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario etiqueta="Correo electronico" tipo="email" id="login-email" valor={email} onCambio={setEmail} />
      <CampoFormulario etiqueta="Contraseña" tipo="password" id="login-password" valor={contraseña} onCambio={setContraseña} />
      <button type="submit" className="btn btn-sonido w-100 mt-3" disabled={enviando}>
        {enviando ? "Ingresando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}

export default FormularioLogin;