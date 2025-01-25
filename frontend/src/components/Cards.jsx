function Cards(props)
{    return(
        <div className="card">
            <img className="card-image" src={props.ruta} alt="" />
            <h2 className="card-title">{props.name}</h2>
            <p className="card-text">{props.description}</p>
        </div>
    );
}

export default Cards