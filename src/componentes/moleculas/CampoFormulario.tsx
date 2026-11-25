import type { Ref } from "react";

interface CampoFormularioProps {
  id: string;
  etiqueta: string;
  valor: string;
  onCambio: (valor: string) => void;
  onDesenfoque?: () => void;
  error?: string;
  obligatorio?: boolean;
  tipo?: "text" | "email" | "password";
  multilinea?: boolean;
  filas?: number;
  placeholder?: string;
  autoComplete?: string;
  ayuda?: string;
  maxLength?: number;
  refInput?: Ref<HTMLInputElement>;
  refTextarea?: Ref<HTMLTextAreaElement>;
}

function CampoFormulario({
  id,
  etiqueta,
  valor,
  onCambio,
  onDesenfoque,
  error,
  obligatorio = false,
  tipo = "text",
  multilinea = false,
  filas = 4,
  placeholder,
  autoComplete,
  ayuda,
  maxLength,
  refInput,
  refTextarea,
}: CampoFormularioProps) {
  const clases = `form-control${error ? " is-invalid campo-error" : ""}`;
  const idError = `${id}-error`;
  const idAyuda = `${id}-ayuda`;
  const descrito = error ? idError : ayuda ? idAyuda : undefined;

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {etiqueta} {obligatorio && <span className="obligatorio">*</span>}
      </label>

      {multilinea ? (
        <textarea
          id={id}
          ref={refTextarea}
          className={clases}
          rows={filas}
          value={valor}
          onChange={(evento) => onCambio(evento.target.value)}
          onBlur={onDesenfoque}
          aria-invalid={Boolean(error)}
          aria-describedby={descrito}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      ) : (
        <input
          id={id}
          ref={refInput}
          type={tipo}
          className={clases}
          value={valor}
          onChange={(evento) => onCambio(evento.target.value)}
          onBlur={onDesenfoque}
          aria-invalid={Boolean(error)}
          aria-describedby={descrito}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      )}

      {(error || ayuda || maxLength !== undefined) && (
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            {error ? (
              <p id={idError} className="mensaje-error mt-1 mb-0" role="alert">
                {error}
              </p>
            ) : ayuda ? (
              <span id={idAyuda} className="small mt-1 texto-suave">
                {ayuda}
              </span>
            ) : null}
          </div>
          {maxLength !== undefined && (
            <span className="small mt-1 texto-suave">
              {valor.length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default CampoFormulario;