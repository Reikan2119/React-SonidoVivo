interface BotonComprarProps {
  onClick: () => void;
  disabled?: boolean;
  children?: string;
}

function BotonComprar({ onClick, disabled = false, children = "Comprar" }: BotonComprarProps) {
  return (
    <button
      className="btn btn-success"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BotonComprar;