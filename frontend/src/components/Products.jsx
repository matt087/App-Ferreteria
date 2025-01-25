import Cards from "./Cards";
import martillo from "../assets/martillo.jpg"
import taladro from "../assets/taladro.png"
import serrucho from "../assets/serrucho.png"
import destornillador from "../assets/destornillador.png"
import perno from "../assets/perno.png"
import clavo from "../assets/clavo.png"
import cemento from "../assets/cemento.jpg"
import varilla from "../assets/varilla.png"



function Products()
{
    return(
        <>
            <h2 className="title-products">Lo más vendido!</h2>
            <main className="container-productos">
                <Cards name="Taladro" description="Taladro de madera" ruta={taladro}/>
                <Cards name="Martillo" description="Taladro de madera" ruta={martillo}/>
                <Cards name="Serrucho" description="Taladro de madera" ruta={serrucho}/>
                <Cards name="Destornillador" description="Taladro de madera" ruta={destornillador}/>
                <Cards name="Pernos" description="Taladro de madera" ruta={perno}/>
                <Cards name="Clavos" description="Taladro de madera" ruta={clavo}/>
                <Cards name="Cemento" description="Taladro de madera" ruta={cemento}/>
                <Cards name="Varilla" description="Taladro de madera" ruta={varilla}/>
            </main>
        </>
        
    );
    
}

export default Products