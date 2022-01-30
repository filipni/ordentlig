import react from "react";
import './Tile.css';

class Tile extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            letter: props.Letter,
            color: 'grey',
            hidden: true
        };
    }
    
    render() {
        return (
            <div className="Tile" style={{backgroundColor:this.state.color}}>
                {this.state.hidden ? '' : this.state.Letter}
            </div>
        );
    }
}

export default Tile;