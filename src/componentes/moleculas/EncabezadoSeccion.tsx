interface EncabezadoSeccionProps {
  subtitulo: string;
  titulo: string;
  descripcion?: string;
  centrado?: boolean;
  anchoDescripcion?: string;
}

function EncabezadoSeccion({
  subtitulo,
  titulo,
  descripcion,
  centrado = true,
  anchoDescripcion = "42rem",
}: EncabezadoSeccionProps) {
  return (
    <div className={centrado ? "text-center mb-4" : "mb-4"}>
      <p className="nosotros-subtitulo mb-2">{subtitulo}</p>
      <h2 className="nosotros-titulo-seccion">{titulo}</h2>
      {descripcion && (
        <p className="nosotros-texto mx-auto mb-0 mt-3" style={{ maxWidth: anchoDescripcion }}>
          {descripcion}
        </p>
      )}
    </div>
  );
}

export default EncabezadoSeccion;
