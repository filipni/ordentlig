import React from 'react';
import Row from './Row.js';
import './Board.css'

class Board extends React.Component {
    constructor(props) {
        super(props);

        const numberOfGuesses = 6;
        const wordLength = 5;
        const numberOfTiles = numberOfGuesses * wordLength;

        this.state = {
            word: 'saint',
            activeTile: 0,
            tiles: Array(numberOfTiles).fill(null),
            numberOfGuesses: numberOfGuesses,
            wordLength: wordLength,
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (this.state.activeTile >= this.state.numberOfTiles) return;

        if(e.key === 'Backspace')
            this.handleBackSpace();
        else if (this.characterIsALetter(e.key))
            this.handleLetter(e.key.toLowerCase())
    }

    characterIsALetter(c) {
        return (/^[a-zA-Z]$/).test(c);
    }

    handleLetter(letter) {
        this.setState(prevState => {
            let updatedTiles = prevState.tiles.slice();
            updatedTiles[prevState.activeTile] = letter;
            return {tiles: updatedTiles, activeTile: prevState.activeTile + 1};
        });
    }

    handleBackSpace() {
        this.setState(prevState => {
            if (prevState.activeTile % prevState.wordLength === 0) return;

            let activeTile = prevState.activeTile - 1; 
            let updatedTiles = prevState.tiles.slice();
            updatedTiles[activeTile] = null;

            return {tiles: updatedTiles, activeTile: activeTile};
        })
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