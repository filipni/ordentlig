import '../style/Tile.css';

function Tile(props) {
    return (
        <div className="Tile" style={props.style}>
            {props.hidden ? '' : props.letter.toUpperCase()}
        </div>
    );
}

export default Tile;