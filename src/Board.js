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
            gameover: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (this.state.gameover || this.state.activeTile >= this.state.numberOfTiles) return;

        this.setState(prevState => {
            if(e.key === 'Backspace')
            {
                if (prevState.activeTile % prevState.wordLength === 0) return;

                let activeTile = prevState.activeTile - 1; 
                let updatedTiles = prevState.tiles.slice();
                updatedTiles[activeTile] = null;

                return {tiles: updatedTiles, activeTile: activeTile};
            }
            else if (this.characterIsALetter(e.key))
            {
                let updatedTiles = prevState.tiles.slice();
                updatedTiles[prevState.activeTile] = e.key.toLowerCase();

                const rowIndex = Math.floor(prevState.activeTile / prevState.wordLength);
                const guessedWord = this.getRowLetters(updatedTiles, rowIndex).join("");

                const gameover = guessedWord === prevState.word;

                return {tiles: updatedTiles, activeTile: prevState.activeTile + 1, gameover: gameover};
            }
        });
    }

    characterIsALetter(c) {
        return (/^[a-zA-Z]$/).test(c);
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
    
    renderRow(index) {
        return <Row key={index} word={this.state.word} letters={this.getRowLetters(this.state.tiles, index)} />;
    }

    getRowLetters(tiles, index) {
        const rowStart = index * this.state.wordLength; 
        const rowEnd = rowStart + this.state.wordLength;
        const rowLetters = tiles.slice(rowStart, rowEnd);
        return rowLetters;
    }
}

export default Board;