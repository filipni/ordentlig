import react from "react";
import './Tile.css';

class Tile extends react.Component {
    render() {
        const style = {backgroundColor:this.props.color};
        return (
            <div className="Tile" style={style}>
                {this.props.hidden ? '' : this.props.letter.toUpperCase()}
            </div>);
    }
}

export default Tile;