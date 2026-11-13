export interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol?: string;
}

export type CambiosUsuario = Partial<Pick<Usuario, "nombre" | "apellido" | "email" | "password" | "rol">>;
