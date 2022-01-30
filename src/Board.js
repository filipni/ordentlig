import React from 'react';
import Row from './Row.js';
import './Board.css'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {word: 'saint'};
    }

    render() {
        return (
            <div className="Board">
                {[...Array(this.state.word.length).keys()].map((index) => (
                    <Row key={index} Word={this.state.word} />
                ))}
            </div>
        );
    }
}

export default Board;