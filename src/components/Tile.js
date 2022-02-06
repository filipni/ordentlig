import '../style/Tile.css';

function Tile(props) {
    const style = {backgroundColor: props.color};
    return (
        <div className="Tile" style={style}>
            {props.hidden ? '' : props.letter.toUpperCase()}
        </div>
    );
}

export default Tile;