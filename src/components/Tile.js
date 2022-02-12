import '../style/Tile.css';
import '../style/Colors.css';

function Tile(props) {
    return (
        <div className={`Tile ${props.state}`} style={props.style}>
            {props.hidden ? '' : props.letter.toUpperCase()}
        </div>
    );
}

export default Tile;