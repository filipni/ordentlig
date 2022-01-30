import React from 'react';
import Tile from './Tile.js'
import './Row.css';

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Word: props.Word};
    }

    render() {
        return (
            <div className="Row">
                {[...this.state.Word].map((letter, index) =>
                    <Tile key={index} Letter={letter} />
                )}
            </div>
        );
    }
}

export default Row;