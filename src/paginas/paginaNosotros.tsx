import HeroNosotros from "../componentes/organismos/nosotros/HeroNosotros";
import EstadisticasNosotros from "../componentes/organismos/nosotros/EstadisticasNosotros";
import HistoriaNosotros from "../componentes/organismos/nosotros/HistoriaNosotros";
import PilaresNosotros from "../componentes/organismos/nosotros/PilaresNosotros";
import ServiciosNosotros from "../componentes/organismos/nosotros/ServiciosNosotros";
import EquipoNosotros from "../componentes/organismos/nosotros/EquipoNosotros";
import GaleriaNosotros from "../componentes/organismos/nosotros/GaleriaNosotros";
import CtaNosotros from "../componentes/organismos/nosotros/CtaNosotros";
import "../estilos/nosotros.css";

function Nosotros() {
  return (
    <div className="nosotros-pagina">
      <HeroNosotros />
      <EstadisticasNosotros />
      <HistoriaNosotros />
      <PilaresNosotros />
      <ServiciosNosotros />
      <EquipoNosotros />
      <GaleriaNosotros />
      <CtaNosotros />
    </div>
  );
}

export default Nosotros;
