import React from 'react';
import Row from './Row.js';
import './Board.css'

const numberOfGuesses = 6;
const wordLength = 5;
const numberOfTiles = numberOfGuesses * wordLength;

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            word: 'saint',
            activeTile: 0,
            tiles: Array(numberOfTiles).fill(null),
            gameover: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (this.state.gameover) return;
        this.setState(prevState => this.updateState(prevState, e.key));
    }

    updateState(prevState, pressedKey) {
        if(pressedKey === 'Backspace') {
            if (this.tileIsFirstInRow(prevState.activeTile)) return;

            let nextTile = prevState.activeTile - 1; 
            let updatedTiles = prevState.tiles.slice();
            updatedTiles[nextTile] = null;

            return {tiles: updatedTiles, activeTile: nextTile};
        }
        else if (this.characterIsLetter(pressedKey)) {
            let updatedTiles = prevState.tiles.slice();
            updatedTiles[prevState.activeTile] = pressedKey.toLowerCase();

            const rowIndex = this.getRowFromTile(prevState.activeTile);
            const guessedWord = this.getRowLetters(updatedTiles, rowIndex).join("");

            const nextTile = prevState.activeTile + 1;
            const gameover = guessedWord === prevState.word || nextTile >= numberOfTiles;

            return {tiles: updatedTiles, activeTile: nextTile, gameover: gameover};
        }
    }

    tileIsFirstInRow(tile) {
        return tile % wordLength === 0
    }

    characterIsLetter(c) {
        return (/^[a-zA-Z]$/).test(c);
    }

    getRowFromTile(tile) {
        return Math.floor(tile / wordLength);
    }

    getRowLetters(tiles, index) {
        const rowStart = index * wordLength; 
        const rowEnd = rowStart + wordLength;
        const rowLetters = tiles.slice(rowStart, rowEnd);
        return rowLetters;
    }

    render() {
        return (
            <div tabIndex={0} className="Board" onKeyDown={this.handleKeyDown}>
                <div className='Banner'>ordentlig</div>
                {[...Array(numberOfGuesses).keys()].map((index) =>
                    this.renderRow(index)
                )}
            </div>
        );
    }
    
    renderRow(index) {
        return <Row key={index} word={this.state.word} letters={this.getRowLetters(this.state.tiles, index)} />;
    }
}

export default Board;