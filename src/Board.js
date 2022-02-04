import React from 'react';
import Row from './Row.js';
import './Board.css'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: 'saint',
            activeTile: 0,
            tiles: Array(30).fill(null),
            numberOfGuesses: 6,
            wordLength: 5,
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (!this.characterIsALetter(e.key)) return;

        this.setState(prevState => {
            const letter = e.key.toLowerCase();
            let updatedTiles = prevState.tiles.slice();
            updatedTiles[prevState.activeTile] = letter;
            return {tiles: updatedTiles, activeTile: prevState.activeTile + 1};
        });
    }

    characterIsALetter(c) {
        return (/^[a-zA-Z]$/).test(c);
    }
    
    renderRow(index) {
        const rowStart = index * this.state.wordLength; 
        const rowEnd = rowStart + this.state.wordLength;
        const rowLetters = this.state.tiles.slice(rowStart, rowEnd);

        return <Row key={index} word={this.state.word} letters={rowLetters} />;
    }

    render() {
        return (
            <div tabIndex={0} className="Board" onKeyDown={this.handleKeyDown}>
                <div className='Banner'>ordentlig</div>
                {[...Array(this.state.numberOfGuesses).keys()].map((index) =>
                    this.renderRow(index)
                )}
            </div>
        );
    }
}

export default Board;